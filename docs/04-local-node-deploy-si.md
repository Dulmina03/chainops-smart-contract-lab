# 04 — Local blockchain deployment: from code to address + vote event

## Goal

Own computer එකේ running Hardhat Node එකකට `SimpleVoting` deploy කරලා local dev account වලින් votes send කරලා state, transaction hash, receipt, logs inspect කරන්න.

## 4.1 Why do we need a network if the contract compiled already?

Compilation result එක bytecode **file** එකක් විතරයි. එය EVM network එකක deploy නොකළොත් chain address එකක් හෝ persistent contract instance එකක් නැහැ. Tests can run against isolated ephemeral simulations. We now want one **running local network** that separate commands/terminals can connect to, so we can see how deployment and interaction work across independent processes.

**Local vs Sepolia:** Local = your own controlled test node (free disposable accounts, reproducible, fast). Sepolia = shared public network, external RPC and test gas, unpredictable latency. Start locally to remove provider/faucet distractions.

## Step 4.2 — Start local Hardhat Node (Terminal A)

```bash
cd voting-lab
npx hardhat node
```

`hardhat node` starts an EVM-compatible simulated development node that exposes **JSON-RPC HTTP**, commonly `http://127.0.0.1:8545`. It keeps chain state while this process remains running. In terminals that spawn a separate process, an in-process default simulation might reset each invocation; running node is how you preserve state between interactions.

**Why two terminals?** Terminal A must keep node running; Terminal B sends deployment/interaction commands to it. **Why no real wallet yet?** Hardhat Node supplies disposable local accounts/signers. Development keys printed for local demonstration are **not secret production wallets** and must never be used on Mainnet/Sepolia with value.

**EXPECTED:** node server listening, accounts printed or available. **VERIFY:** send commands in Terminal B with `--network localhost`; stop Terminal A only after exercises finish. If you stop/restart, local state can reset; do not confuse it with Sepolia deployment.

## Step 4.3 — What is contract deployment, really?

Deploy is a **contract creation transaction** submitted to chain. Signed transaction contains init/creation bytecode (and encoded constructor arguments, if any); after execution it results in runtime bytecode at a contract address. Normal contract interaction transactions use `to = contract address` and ABI-encoded function calldata. Compiler doesn't 'install' code itself; deployment does.

## Step 4.4 — Create a Hardhat Ignition module

File: `voting-lab/ignition/modules/Voting.ts` (look at generated `Counter.ts` first):

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("VotingModule", (m) => {
  const voting = m.contract("SimpleVoting");
  return { voting };
});
```

- `buildModule`: defines a deployment plan, **doesn't deploy when module is defined**.
- `VotingModule`: stable deployment module identifier for Ignition state/history.
- `m.contract("SimpleVoting")`: choose compiled contract; constructor args omitted because SimpleVoting has none.
- `return {voting}`: makes named deployment result available.

**WHY Ignition instead of custom script?** It tracks/resumes deployment actions and captures deployment metadata; beginners can focus on what is deployed and see result without implementing all lifecycle logic. ChainOps itself will build its own governance/tracking around such operations.

## Step 4.5 — Deploy (Terminal B)

```bash
npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost
```

- `ignition`: Hardhat's declarative deployment subsystem.
- `deploy`: execute plan (can submit on-chain transaction).
- `ignition/modules/Voting.ts`: deployment module filepath, not Solidity source path.
- `--network localhost`: send through local JSON-RPC node instead of a separate default ephemeral simulation or Sepolia.

**EXPECTED:** CLI shows deployment steps and a `SimpleVoting` contract address. Inspect `ignition/deployments/chain-...` directory for recorded data; chain ID may depend on config. **VERIFY:** copy address (public), distinguish it from transaction hash (also public), confirm node still running.

## Step 4.6 — Interact with contract using viem

The `viem` library lets TypeScript code call a contract using its **ABI**. Use AI tutor to create a tiny `scripts/interact.ts` **based on the generated template and installed Hardhat 3 viem API**, not outdated Hardhat 2 `ethers.getContractFactory` samples. Provide your local actual contract address to the script (not hard-code a sample). Execute with:

```bash
npx hardhat run scripts/interact.ts --network localhost
```

`run` executes chosen TS script within Hardhat environment. `--network localhost` uses the same node where you deployed.

**Exercise sequence:**

1. Read candidate 0 count (`0`) without transaction.
2. Account A calls `vote(0)`, sign/send transaction; wait for receipt. Check hash and status.
3. Read candidate 0 count (`1`).
4. Account A retries `vote(1)` -> `Already voted` revert/error; verify candidate 1 unchanged.
5. Account B votes candidate 1, check results.
6. Decode `VoteCast` log from actual successful receipt using ABI; identify `voter`, `candidateId`, tx hash, block number.

### The six pieces of evidence

| Evidence | Meaning | Why ChainOps stores/uses |
|---|---|---|
| Source commit SHA | exact source version | M1 pipeline correlation |
| Artifact ABI/bytecode | what was built | M2 deploy; M3 decode |
| Sender address | actor/account that signed | auditing / nonce management |
| Tx hash | identifier for submitted tx | M2 tracking |
| Receipt + status | confirmed inclusion/execution outcome | M2 decide success/failure |
| Event logs + block | runtime activity | M3 monitoring |

**If a tx reverts:** don't say 'the node is down' or 'the Solidity source didn't compile'. A revert means EVM executed logic which rejected state change; distinguish from submission/RPC errors.

## Step 4.7 — Observe chain reset

Record local contract address + count. Stop node and restart; confirm whether historical deployment still exists. Unlike Sepolia, this dev node isn't a persistent shared public chain. **Why important?** ChainOps environments and registry records must include network/chain identity, not bare address.

## Checkpoint

1. Build vs deploy, ABI vs bytecode, contract address vs tx hash differences.
2. Why `--network localhost` and two terminals?
3. Why can two accounts vote but one account cannot vote twice?
4. Why should we wait for receipt instead of success from `sendTransaction` alone?
5. Why can't a local network contract address identify a Sepolia contract?

**Next:** [Lesson 05 — Sepolia](05-sepolia-testnet-si.md). Docs: https://hardhat.org/docs/guides/hardhat-node and https://hardhat.org/docs/guides/deployment/using-ignition
