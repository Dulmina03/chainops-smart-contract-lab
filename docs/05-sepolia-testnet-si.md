# 05 — Public Sepolia testnet: test-only wallet, gas, RPC, faucet, safe deployment

> **Gate:** Lesson 04 local build/test/deploy/vote/receipt exercises complete කරන්න. මේ lesson එකේ real funds, Mainnet, production keys හෝ personal wallet ඕනේ නෑ.

## 5.1 Why Sepolia? Why not just use local Hardhat forever?

Local node ඔබම run කරන simulator එක. Sepolia වෙනම shared public Ethereum testnet එකක්. ඔබේ laptop එක off වුණත් testnet chain continue වෙනවා. Public RPC provider, distributed block inclusion, latency, chain ID mismatch, funded gas, explorer observation, provider timeout වැනි දේවල් ChainOps deployment system එකට tackle කරන්න වෙනවා. Testnet source/runtime behavior broadly EVM-like වුණත් testnet != mainnet. **Sepolia is optional if faucet/provider unavailable; first proof is local.**

## 5.2 Wallet — exactly why, and what should we use?

**Purpose:** Contract deployment and `vote()` are state-changing **transactions**. Network must verify sender's cryptographic signature. A wallet/account manages key to sign. On local Hardhat network you had supplied disposable signers. On Sepolia create a **new burner wallet/account used ONLY for testnet**. Option: reputable browser wallet app (MetaMask or equivalent), or a secure CLI-created test account. Browser wallet isn't mandatory if Hardhat uses a signing private key; do not assume clicking browser wallet is required for scripts.

**Do not** import your real personal mainnet wallet or use a seed phrase from an existing wallet. **Never** copy private key/seed phrase into Git, screenshots, chat, Codex/Claude prompts, logs or a `hardhat.config.ts` literal. Keep backup secure and access to test-only key limited. Each member uses an independent burner wallet.

**Public address vs private key:** Faucet only needs public address; signed deploy needs private key locally/secure keystore. Anyone can look up public address balance; exposing key permits spending/control.

## 5.3 RPC provider — why sign + provider both?

Private key signs 'I authorize this deployment'. **RPC node** relays and exposes network data. Provider URL is like `https://...` for Sepolia node access. Provider doesn't own your key when local signing is used. If provider fails, the transaction may have been broadcast even though your request timed out, so check actual tx hash/nonce/chain before blindly retrying deployments. This is key M2 issue.

## 5.4 Gas and faucet — why need test ETH?

EVM computation/storage has gas costs. Even when contract has no monetary value, deployment uses gas. On Sepolia gas payment uses **Sepolia test ETH**; local dev node usually has automatically funded disposable accounts. Faucet is a developer service giving limited test ETH to a public address. Faucet rules/caps/availability change; consult https://ethereum.org/en/developers/docs/networks/ for current listed Sepolia faucets. Never pay someone real money for this course exercise; if faucet blocked, learn local path first and return later.

## 5.5 Safe configuration (Hardhat 3 verified pattern)

Use the Hardhat 3 keystore built into the official toolbox to keep config values **encrypted in your home directory**. First make sure installed plugins support task via `npx hardhat --help`.

```bash
npx hardhat keystore set SEPOLIA_RPC_URL
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

Each command prompts you to enter a secret securely; do not write the value in command arguments. `keystore set` means encrypt/store named configuration variable (not create a blockchain wallet). When first used it asks for a keystore password. Do not use `--dev` for private keys because dev keystore is unencrypted / not password protected. Do not include keystore or password in repository.

Add `sepolia` network entry to existing generated `hardhat.config.ts` (preserve existing plugin/template configuration). It may look like this:

```typescript
import { configVariable, defineConfig } from "hardhat/config";
// Keep the already-generated plugin imports and other config entries.

// In the exported defineConfig({ ... }) object, add under networks:
// sepolia: {
//   type: "http",
//   chainType: "l1",
//   chainId: 11155111,
//   url: configVariable("SEPOLIA_RPC_URL"),
//   accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
// }
```

**Important:** This is an **insertion illustration**, not a complete replacement config. The commented network block should be adapted into your existing networks object. `type: "http"` = external JSON-RPC; `chainType: "l1"` = Ethereum-style layer 1; `chainId` ensures Sepolia identity; `url` provider; `accounts` signer key fetched at runtime. `configVariable` resolves from keystore/env. Do not paste private key there.

**VERIFY before deploy:** wallet address is correct and testnet-funded; RPC points to Sepolia chain ID **11155111**. Ask tutor how to read chain ID and balance using viem; inspect without exposing secrets.

## 5.6 Run deployment deliberately

```bash
npx hardhat ignition deploy ignition/modules/Voting.ts --network sepolia
```

This uses same declarative module as local lesson, but deployment target and signer are different. Testnet deployment may wait for confirmation and prompt for keystore unlock. Hardhat may store results in `ignition/deployments/chain-11155111/`. A tx hash/public contract address can be shared in an exercise log, but NEVER secrets. Inspect actual deployment outcome before marking success.

**Why same source/artifact?** So comparison of local and Sepolia reflects environment difference rather than entirely different code. For ChainOps, always deploy exact tested/approved build artifact; Ignition may compile as part of its routine, so log/pin source commit, compiler/version/settings and compare artifact identity in your learning experiment. Production ChainOps must enforce that property more strictly.

## 5.7 Check through a block explorer

Visit `https://sepolia.etherscan.io` and search **your actual transaction hash or deployed address**, not an invented example. Verify network is Sepolia, status, sender, contract address, block, gas used, and (if available) logs. Explorer is a read-oriented UI for blockchain data; the chain itself lives across nodes, not inside explorer's webpage.

Next, invoke `vote(0)` using properly configured script/signing account on Sepolia, wait for receipt, and inspect `VoteCast` event. Each account may vote once per deployment; if you already used account in this contract, further votes revert. To test multiple voters, use distinct test accounts—not impersonation.

## 5.8 What if something fails?

| Problem | Actual likely layer | What to verify |
|---|---|---|
| insufficient funds | wallet test ETH balance | faucet amount / network |
| wrong chain ID | RPC/config mismatch | provider network actual chain ID |
| invalid signer / key | secrets/config | secret set locally; NEVER print key |
| RPC timeout | provider/network | check explorer/tx state before retry |
| transaction reverted | contract/EVM execution | receipt status and revert reason |
| no address/receipt yet | pending tx or submission issue | pending vs failed vs confirmed |
| contract not visible locally | network isolation | Sepolia address != local chain |

## 5.9 Checkpoint

1. Why create a **new test-only** wallet? Local Hardhat accounts aren't enough for Sepolia?
2. Who signs and who relays a transaction?
3. Test ETH from faucet — why need it even without real money?
4. Why `--network sepolia` and chain ID 11155111?
5. Transaction hash vs receipt success vs block confirmations?
6. If RPC times out, why avoid immediately sending a duplicate deployment?

Official: https://hardhat.org/docs/guides/configuration-variables , https://hardhat.org/docs/guides/deployment/using-ignition , https://ethereum.org/en/developers/docs/networks/
