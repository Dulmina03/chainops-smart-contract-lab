# 00 — START BEFORE CODING: අපි යන ගමන, අපේ ඉලක්කය, හා අවසාන demo එක

> **මුලින් මෙය කියවන්න.** මේක code tutorial එකක් නෙමෙයි. Smart contract ගැන කිසිම පළපුරුද්දක් නැති පස්දෙනෙකුට **අපි මොකක්ද කරන්නේ? ඇයි කරන්නේ? අවසානයේ මොනවද පෙන්වන්නේ?** කියලා එකම mental model එකක් හදාදෙන orientation එකයි.

## 0.1 අපේ සැබෑ අරමුණ

ChainOps කියන්නේ Smart Contract DevSecOps/operations platform එකක්. ChainOps හදන්න කලින්, මේ platform එක හරහා automate කරන්න යන වැඩ මිනිසා විසින් manually කරන හැටි දැනගන්න ඕනේ. **SimpleVoting** project එක ඒ වෙනුවෙන් තැනෙන පුංචි lab application එකයි; එය ChainOps එක නෙමෙයි.

**මේ lab එකෙන් ලැබිය යුතු සාක්ෂිය:** පස්දෙනාටම independently Solidity code compile කරන්න, tests run කරන්න, local EVM එකකට deploy කරන්න, `vote()` call කරන්න, transaction/receipt/events බලන්න, Sepolia එකේ වෙනස explain කරන්න, Slither results interpret කරන්න පුළුවන් වීම.

### අපේ end result (finished state)

```
Member writes or modifies SimpleVoting.sol
  -> Git commit (exact source revision)
  -> Hardhat build -> ABI and bytecode
  -> Hardhat test -> pass/fail evidence
  -> Slither -> findings (and scanner errors if any)
  -> Local Hardhat Node -> deploy -> contract address
  -> Wallet/account signs vote transaction
  -> EVM executes -> state changes -> VoteCast event
  -> Receipt and logs inspected -> event decoded
  -> Repeat deployment on public Sepolia testnet
  -> Draw connection to ChainOps modules M1–M5
```

**Successful demo script (~4 minutes):** Terminal එකක `npx hardhat test` pass වෙනවා පෙන්වන්න. Compiled artifact එකේ `abi` සහ `bytecode` බලන්න. Local node එකට deploy වෙලා contract address ලැබෙන හැටි පෙන්වන්න. Account A එකෙන් candidate 0 ට vote කරලා total එක 1 වෙන හැටි බලන්න. ආයෙම account A ඡන්දය දුන්නාම revert වෙන හැටි පෙන්වන්න. Transaction receipt, `VoteCast` log decode කරන්න. අවසානයේ Sepolia explorer එකේ real testnet deployment එකක් පෙන්නන්න (test ETH පමණයි). 

**මෙය නොවේ:** React voting website එකක්, production election application එකක්, identity verification system එකක්, token/coin එකක්, හෝ mainnet DApp එකක්. UI නොතිබුණත් lab එක succeed විය හැකියි; terminal-based interactions ප්‍රමාණවත්.

## 0.2 උදාහරණයක්: මොකද මෙහෙම learning flow එකක් අවශ්‍ය?

සාමාන්‍ය web app එකක `POST /vote` කියද්දී request එක backend එකට යනවා. Backend database row update කරනවා. Smart contract එකක නම් state update වෙන්නේ blockchain එකේ EVM execution එකකින්. Transaction එක sign කළ යුතුයි; ගෙවිය යුතු gas fee එකක් තියෙනවා; confirmation එනකල් transaction hash එක පමණක් විශ්වාස කරන්න බැහැ. ChainOps හදන්නේ මේ whole lifecycle එකේ source, test, scan, approval, deployment හා monitoring connect කරලා දෙන platform එක.

## 0.3 Tools / systems වල roles — එකිනෙක confuse කරගන්න එපා

| Thing | මොකක්ද? | ඇයි අවශ්‍ය? | මෙය නෙමෙයි |
|---|---|---|---|
| VS Code | code editor | Solidity/TypeScript files inspect/change | blockchain node |
| Node.js + npm | TypeScript tools run/resolve | Hardhat plugins/CLI | smart-contract VM |
| Solidity | contract source language | EVM logic express කරන්න | deployed executable itself |
| `solc` | Solidity compiler | Solidity -> EVM bytecode + ABI | security scanner |
| Hardhat 3 | local dev/test/build/deploy framework | tools එක workflow එකකට ගෙන ඒම | public blockchain |
| Hardhat Node | localhost EVM-compatible test node | own fast/disposable chain | Sepolia/Mainnet |
| viem | JS/TS Ethereum interaction library | calls, tx, logs, ABI decoding | wallet itself |
| Wallet/account | key+address identity/signing | state-changing transactions authorize කරන්න | website login |
| RPC endpoint | node එකකට requests යවන URL/interface | chain state/read/write access | blockchain storage itself |
| Sepolia | shared Ethereum test network | network/RPC/confirmation real-life cases | mainnet |
| Test ETH | Sepolia gas payments | transaction execution costs pay කරන්න | real ETH on Mainnet |
| Ignition | declarative deployment manager | contract deploy workflow and deployment records | Solidity compiler |
| Slither | static source analysis | common vulnerability patterns detect | proof of contract safety |
| GitHub fork | repository copy linked to original | each member independent code work | blockchain/network fork |
| ChainOps | future orchestrator and governance app | all above tools/data connected | Solidity IDE/blockchain |

## 0.4 Learning stages — dependency order matters

| Stage | First understand | Practical deliverable | Why not skip? |
|---|---|---|---|
| 0 Orientation | end goal, project boundaries | explain flow out loud | otherwise blind commands |
| 1 Blockchain | EVM, tx, wallet, gas, ABI | explain one vote lifecycle | cannot interpret outputs |
| 2 Hardhat starter | project configuration/compiler/test | stock Counter tests pass | first confirm toolchain |
| 3 Voting logic | storage, mapping, events, revert | `SimpleVoting.sol` + tests | behavior evidence |
| 4 Local deployment | node, accounts, receipts | deployed address + successful vote | no third-party infrastructure dependency |
| 5 Sepolia | public testnet, RPC, test wallet | verified testnet tx + explorer observation | realistic network failure modes |
| 6 Analysis/monitor | Slither, ABI logs | findings + decoded event | needed for M4 and M3 |
| 7 ChainOps mapping | automated stages | commit -> artifact -> event trace sheet | connects learning to real project |

**Stop rule:** A stage isn't done until you can answer its learning questions **without copying from AI**. Stage 5 may be postponed if a faucet/provider is unavailable; don't block lessons 6–7.

## 0.5 Five-member team plan

All five attend a shared introduction and work through all foundational exercises on their own machines/forks. Team discussion is collective, actual command runs and notes are individual. After the common flow: M1 explores pipeline automation; M2 deployment/receipt; M3 event decoding; M4 Slither/policy; M5 platform authorization/integration. One team-reviewed reference demo can eventually be kept in upstream; don't merge five copies.

### Suggested schedule (adapt freely)

- Session A (1.5 h): Orientation and terms; explain what deployment means before commands.
- Session B (2 h): Repository/fork/Hardhat 3 initialization and existing Counter build/test.
- Session C (2 h): SimpleVoting code exploration and 6 tests, including failures.
- Session D (2 h): Local node, accounts, deployment, vote, receipts.
- Session E (1.5 h): New test wallet, Sepolia RPC, faucet, deployment.
- Session F (2 h): Events/Slither and failed runs.
- Session G (1.5 h): Each member narrates the complete flow and maps to their ChainOps module.

## 0.6 Commonly confused words — before coding

**GitHub fork ≠ Hardhat blockchain forking.** GitHub fork = repository linked copy in your GitHub account. Blockchain fork (advanced feature) = local node using snapshot/state of another blockchain. We are using only the **GitHub fork** at the start; don't enable Hardhat network forking.

**Clone ≠ fork.** Fork on GitHub creates online copy. Clone downloads the fork to local laptop. `origin` should point to your fork, `upstream` to org main repo.

**Hardhat ≠ blockchain network.** Hardhat is toolchain. `npx hardhat node` creates a local blockchain simulator. Sepolia is separate public network; `--network sepolia` means you contact that specific configured network.

**Address ≠ private key.** Address is public identifier; private key authorizes signatures and must be secret. You don't need a browser wallet to run local test; Hardhat provides disposable local accounts. A dedicated test wallet is for Sepolia. 

**Read call ≠ write transaction.** Read calls use RPC to query state and don't create on-chain changes. `vote()` updates state, needs signed transaction and gas. In a test runner this may be automatically managed by simulation tools, but the real EVM semantics remain.

**Submitted ≠ confirmed ≠ succeeded.** Transaction hash tells you which submission to investigate; receipt after inclusion carries execution result. Confirmations refer to additional accepted blocks/chain policy and aren't identical to receipt success.

**ABI ≠ bytecode.** ABI is the interface schema that clients use to encode function calls/decode events; bytecode is executable machine code deployed/executed by EVM.

## 0.7 First-day team discussion (no coding yet)

Each person should answer out loud: (1) Why can't we just store votes in a PostgreSQL table for this educational exercise? (2) Why does a wallet sign a vote? (3) Where does deployed bytecode live? (4) If I stop my local Hardhat node, is my Sepolia deployment affected? (5) Why does ChainOps need the exact source commit? If unsure, ask AI in Sinhala; don't bluff.

**Next:** [Lesson 00 — repository](00-start-here-si.md), then [Lesson 01 — fundamentals](01-web3-foundations-si.md).
