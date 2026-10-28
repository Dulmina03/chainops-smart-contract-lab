# ChainOps — Complete Smart Contract Learning Handbook (සිංහලෙන්)
> Zero-experience / 5-member beginner course · VS Code + Hardhat 3 + SimpleVoting · Verified reference links and safe lab workflow · 2026-10-28

## Read this first
මෙය **සම්පූර්ණ handbook එක**: orientation, concepts, commands, local/testnet deployment, security/event analysis, ChainOps mapping, AI tutor prompts, glossary. Modular lessons remain separately under `docs/` so Codex/Claude Code can teach one checkpoint at a time.

**Do not start with `npx hardhat --init`.** First read Chapter 0 and Chapter 1. Every important domain command has a rationale, expected output, verification and ChainOps relevance.

## Table of contents
- [0. Project Journey](docs/00-project-journey-si.md)
- [0B. GitHub organization/fork](docs/00-start-here-si.md)
- [1. Web3 foundations](docs/01-web3-foundations-si.md)
- [2. Hardhat setup](docs/02-hardhat-setup-si.md)
- [3. Voting contract/tests](docs/03-voting-contract-tests-si.md)
- [4. Local deployment](docs/04-local-node-deploy-si.md)
- [5. Sepolia / wallet](docs/05-sepolia-testnet-si.md)
- [6. Security & events](docs/06-security-events-si.md)
- [7. ChainOps mapping](docs/07-chainops-mapping-si.md)
- [8. AI tutor guide](docs/08-ai-tutor-guide-si.md)
- [9. Glossary & FAQ](docs/09-glossary-faq-si.md)

---

<!-- SOURCE CHAPTER: docs/00-project-journey-si.md -->
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

**Next:** [Lesson 00 — repository](docs/00-start-here-si.md), then [Lesson 01 — fundamentals](docs/01-web3-foundations-si.md).


---

<!-- SOURCE CHAPTER: docs/00-start-here-si.md -->
# 00B — GitHub organization repository, fork, clone, origin/upstream (සිංහලෙන්)

## WHAT / Outcome

Team එකේ එක් common guidance repository එකක docs තියෙනවා. පස්දෙනා GitHub account වල **individual forks** හදලා ඒවා clone කරනවා. තමන්ම `voting-lab/` initialize කරලා changes own fork එකට push කරනවා.

## WHY? Shared code project එකක repo එක initialize කරලා දෙන්න බැරිද?

මෙය normal product development එකක් නෙමෙයි; **learning exercise** එකක්. Hardhat-generated project structure, configuration, examples හැමෝම දැනගැනීම required. මුල සිට upstream Hardhat scaffold publish කළොත් members රෑනේ ඒක clone කරලා initialize step එක නොදැන යයි. Forks නිසා independent evidence/commit histories තියෙනවා; team docs update වුණාම upstream changes sync කළ හැකියි.

## Step 1 — Organization upstream repository create කරන්න

GitHub organization `intelli-collective` තුළ `chainops-smart-contract-lab` repository එක create කරන්න (ඔබේ org name වෙනස් නම් ඒක භාවිතා කරන්න). Public repo නම් forks straightforward; public කිරීමට පෙර repo docs වල personal information, secrets, paid API credentials කිසිවක් නැති බව check කරන්න. Membersට public repo share කිරීම acceptable නොවේ නම් organization policies අනුව fork permissions තහවුරු කරන්න හෝ template copies භාවිතා කරන්න.

**What goes in main?** `README.md`, `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `MASTER_LEARNING_HANDBOOK_SI.md`, `docs/`, `exercises/`, `templates/`, `.gitignore`, `.github/`. **What should NOT be precreated?** `voting-lab/contracts`, `test`, `ignition`, `hardhat.config.ts`, `package.json`; everyone generates these locally.

**Verify:** Upstream default branch shows instructions only; no generated Hardhat files.

## Step 2 — Fork into individual GitHub account

Each member opens upstream repo → top-right **Fork** → chooses own account. Fork එක ගත්තම `your-username/chainops-smart-contract-lab` කියලා GitHub copy එකක් ලැබෙනවා; upstream link maintain වෙනවා.

**Why fork?** වෙනම work/commit history, upstream read-only discipline, no accidental overwrite. **Fork ≠ branch:** branch is a line of development in one repository; fork is a separate GitHub repository associated with original. **Fork ≠ clone:** fork is hosted on GitHub, clone is on your PC.

## Step 3 — Clone your fork; point `upstream` at org repo

```bash
# Replace YOUR-USERNAME with your actual GitHub account.
git clone https://github.com/YOUR-USERNAME/chainops-smart-contract-lab.git
cd chainops-smart-contract-lab

git remote add upstream https://github.com/intelli-collective/chainops-smart-contract-lab.git
git remote -v
```

**Domain meaning:** `origin` normally refers to your fork (where you push experiments); `upstream` refers to org original (where shared lessons live). `git remote -v` confirms that the URLs are not accidentally swapped. These are Git concepts, not EVM networking terms.

**Verify:** `origin` -> `YOUR-USERNAME`, `upstream` -> organization. If your fork already has an `upstream`, don't add it twice.

## Step 4 — Read guide before making code

Open `docs/00-project-journey-si.md` and `docs/01-web3-foundations-si.md`. Complete their checks. After that create an **empty** `voting-lab/` locally. This folder exists only in your individual local repo until you commit your generated project.

```bash
mkdir voting-lab
cd voting-lab
npx hardhat --init
```

`npx hardhat --init` කියන command එක package manager context එක තුළ Hardhat initializer run කරලා project skeleton/config/tests/deployment examples generate කරනවා. Choose **Hardhat 3 + TypeScript + viem / `node-test-runner-viem`**. If interactive template selection differs, use the official documented `--template node-test-runner-viem` only on a fresh empty directory. **Do not initialize twice.**

**Why no `voting-lab` in upstream?** So every member sees scaffold birth and can explain each generated file. `voting-lab` still resides under clone, so Git can track it after initialization.

## Step 5 — Keep a learning branch, then push to your fork

```bash
# Run at repository root; choose meaningful name.
git switch -c feat/issue-1-hardhat-starter
git status
# After verifying the generated project is safe and tests work:
git add voting-lab docs/learning-logs
# If you did not create a docs/learning-logs/ file yet, omit that path.
git commit -m "chore(repo): initialize hardhat learning lab"
git push -u origin feat/issue-1-hardhat-starter
```

Don't blindly run the optional `git add` paths until they exist. The tutorial uses sample issue #1, **replace with your actual issue number** and respect `CONTRIBUTING.md`. Individual learning artifacts don't need to be merged into upstream; one PR can be used for review without merge.

## Step 6 — When main lessons change

Use GitHub fork page's **Sync fork** control, after reviewing changes. If your personal `main` contains lab changes, sync can cause conflicts; keep exercises on feature branches, preserve your commits, and ask before force/reset. `git fetch upstream` only downloads history; does NOT silently overwrite files.

## Understanding check

1. Fork, clone, branch වෙනස ඔබගේ වචන වලින් කියන්න.
2. `origin` එකට push කළාම org main repository එක auto-update වෙනවද?
3. `upstream` කියන්නේ blockchain RPC එකක්ද Git remote එකක්ද?
4. Hardhat scaffold එක member තමන්ම create කරන්නේ ඇයි?

**Next:** [Lesson 02 Hardhat](docs/02-hardhat-setup-si.md).


---

<!-- SOURCE CHAPTER: docs/01-web3-foundations-si.md -->
# 01 — Zero to Web3: Blockchain, Solidity, Wallet, EVM, Gas, RPC, ABI (සිංහලෙන්)

> **Objective:** Terminal open කිරීමට පෙර data සහ transactions කොහෙද යන්නේ, කවුද authorize කරන්නේ, execution එක කොතනද වෙන්නේ කියලා පැහැදිලි mental model එකක් ලබාගැනීම. Code ලියන්නේ නෑ.

## 1.1 Blockchain කියන්නේ ඇත්තටම මොකක්ද?

Blockchain කියන්නේ block කියන data containers එකකට එකක් සම්බන්ධ කරගෙන, network participants අතර agreed state/history maintain කරන distributed system එකක්. Ethereum වගේ network එකක account balances, contract code, contract state වගේ දේවල් network එකේ තිබෙනවා. Database එකක් වගේ records තියාගන්න පුළුවන් වුණත්, **trust/execution model** එක වෙනස්: centralized backend එකක් තනිව `UPDATE votes` කියලා කරන්න බෑ; state update කරන්න valid signed transaction එකක් network එකට submit කරලා EVM rules අනුව execute වෙන්න ඕනේ.

**Why for this lab?** Voting example එකේ `voteCounts` variable එක app server RAM එකේ නෙමෙයි, blockchain contract storage එකේ තියෙන බව දැකගන්න.

## 1.2 Smart contract / Solidity / EVM — එකම දෙයක්ද?

- **Smart contract:** blockchain address එකකට deploy කරන program එක. Rules/logic on-chain execute වෙනවා.
- **Solidity:** programmer කෙනෙක් source code ලියන language එක. `.sol` files.
- **solc:** source code compile කරලා EVM **bytecode** හා **ABI** artifacts ජනනය කරන compiler එක.
- **EVM (Ethereum Virtual Machine):** bytecode execute කරන virtual machine. Local Hardhat Node සහ Sepolia යන දෙකේම EVM-compatible execution model තියෙනවා.

**Think:** Java source/JVM bytecode analogy helpful; same implementation නොවන බව මතක තබාගන්න. `.sol` file එක blockchain එකට upload කරන්නේ නෑ; deploy transaction එකෙන් compiled creation bytecode යවලා runtime code install කරනවා.

## 1.3 Wallet කියන්නේ මොකක්ද? ඇයි wallet එකක් අවශ්‍ය?

Wallet කියන්නේ coins තබාගන්න folder එකක් කියන අර්ථය පමණක් නෙමෙයි. Practical terms වලින් wallet software එක **private key(s)** manage කරලා transactions **digitally sign** කරන්න උදව් කරනවා. Private key එකෙන් derived public address එක අපේ sender identity එක. Smart contract එකේ `msg.sender` තුළ transaction caller address එක ලැබෙනවා. `hasVoted[msg.sender]` කියන logic එකෙන් ඒ account එකට එක vote එකක් enforce කරනවා.

**Why signing?** Network එකට 'මම account A, vote කරන්න ඕනේ' කියලා plain text request එකක් දුන්නොත් වෙන කෙනෙක් A වගේ impersonate කරගන්න පුළුවන්. Signed transaction එකෙන් corresponding private key control කරන බව cryptographically verify වෙනවා.

**Do we need wallet TODAY?** No. Local Hardhat node එක default disposable/unlocked dev accounts දෙන්න පුළුවන්. ඒවා real value සඳහා යොදාගන්න එපා. Sepolia යන විට **separate test-only account/private key** අවශ්‍යයි (browser wallet app optional, but convenient for visual inspection). Personal mainnet wallet / seed phrase කිසිවක් lab එකේ use නොකරන්න.

**Security:** Address/tx hash share කළාට සාමාන්‍යයෙන් ප්‍රශ්නයක් නැහැ. Private key, recovery phrase, wallet seed කිසිදිනක chat/PR/screenshot/git history වල දාන්න එපා. Test wallet එකක් leak වුණත් funds/identity misuse විය හැකියි; 'test-only' කියලා secret අවදානම නැති නොවේ.

## 1.4 Account, address, `msg.sender`, one vote per wallet

Ethereum-style account එකක් EVM context එකෙන් address එකකින් identify වෙනවා. Contract එක account address පදනම්ව rules enforce කරනවා. `msg.sender` හරහා contract function එක call කළ caller address එක හඳුනාගන්න පුළුවන්.

**Important limitation:** එක් මනුස්සයෙකුට wallets කිහිපයක් හදන්න පුළුවන්. ඒ නිසා `hasVoted[msg.sender]` = **one address one vote**, not one human one vote. Real election integrity, anonymity, privacy සඳහා මේ example එක ප්‍රමාණවත් නෑ. මේක educational lab එකක්.

## 1.5 Network, node, chain ID

**Network:** same chain state/history share කරන nodes group එකක්. **Node:** protocol/software instance. **Chain ID:** network identity help කරන number එක; wrong chain එකකට transaction submit කිරීම වලක්වන්න check කරනවා. Hardhat local default network chain ID often **31337**, Sepolia **11155111** (configuration inspect කරන්න). Same wallet address different networks වල තිබුණත් **balance/state/transactions share නොවේ**.

**Why Sepolia?** Local node ඔබේ computer එකේ controlled simulator එකක්. Sepolia independent shared testnet: public blocks, external RPC, latency, gas paid in test ETH, explorer, network errors. ChainOps deployment service එක eventually handle කළ යුතු challenges. **Use only after local success**. Test ETH should be requested from faucet, not bought for the lab.

## 1.6 RPC (Remote Procedure Call) / Provider

RPC කියන්නේ network node එකකට `eth_getBalance`, `eth_call`, `eth_sendRawTransaction`, `eth_getTransactionReceipt`, `eth_getLogs` වගේ requests යවන interface එක. `http://127.0.0.1:8545` local node එකේ endpoint එක. Sepolia වෙද්දී external provider URL එකක්. **Provider is a gateway, not the blockchain.** Provider unavailable නම් network එකම නවතිනවා කියන අදහස නොවේ.

**Why this matters:** M2 deployment worker uses RPC for signing/submission/receipts; M3 uses RPC/WebSocket/event queries. M5 stores network credentials/settings.

## 1.7 Transaction vs read-only call

- `getVoteCount()` වගේ `view` function එකක් query කිරීම `eth_call`: general case එකේ no signature, no on-chain state change, no paid gas transaction (node still simulates execution).
- `vote(candidateId)` writes to `voteCounts`: sender signs a transaction; EVM executes on inclusion; it may revert if invalid. Gas consumed even when contract call reverts (depending on situation and network semantics).

### A vote lifecycle, precisely

```
Wallet/account selects candidate 0
  -> viem encodes vote(0) using ABI
  -> transaction includes destination contract, calldata, nonce, chain/fee data
  -> private key signs the transaction
  -> JSON-RPC submits it to node
  -> node/network validates it and includes in block
  -> EVM executes vote(0); checks require() and changes storage
  -> contract emits VoteCast event as log
  -> transaction receipt records status and logs
  -> application queries storage or decoded events
```

**One frequent misunderstanding:** `transaction hash` does **not** prove success; receipt status/actual chain state are required. `contract address` identifies deployed code, while tx hash identifies specific deployment/vote transaction.

## 1.8 Gas, ETH, test ETH, faucet

Smart-contract execution uses computational/storage resources. **Gas** is unit measuring execution work. Transactions include fee arrangements and require ETH-equivalent funds on that specific chain. On Sepolia you pay **Sepolia test ETH** which isn't Ethereum Mainnet ETH; faucets provide limited test funds to developers. Faucet availability/requirements change, so current official networks page lists options.

**Why gas?** Without a metering/fee mechanism attackers could spam endless computation/state updates. **Why do we need a faucet?** Your new Sepolia account may have zero test ETH; it cannot pay deployment/vote transaction gas yet. **Why not just local node?** Local does not demonstrate external network/RPC/confirmation behavior. **Why not start Sepolia immediately?** Faucet/provider problems obscure beginner coding errors.

## 1.9 ABI, bytecode, artifacts, deployed code

Compilation output includes:

- **ABI (Application Binary Interface):** JSON description of function names, inputs, outputs, events, errors. `viem` uses ABI to encode `vote(0)` and decode `VoteCast` log. Similar to a machine-readable API contract, not exact equivalent of OpenAPI.
- **Bytecode:** machine instructions EVM understands. Deployment creation bytecode produces runtime code installed at contract address.
- **Compiler metadata:** version, optimization settings and build inputs can affect output; ChainOps must preserve provenance.

**Why ChainOps saves it?** M2 deploys **same artifact already tested/approved**, M3 needs ABI to interpret logs. Recompiling a different revision or settings after approval breaks validation traceability.

## 1.10 Event / log / monitoring

When Solidity function calls `emit VoteCast(voter, candidateId)`, EVM transaction emits a log. This is **not** the same as changing the `voteCounts` storage variable: state tracks totals; event tells observers *something happened*. ABI needed to decode log topics/data into meaningful fields. Public RPC can retrieve logs, but indexers must handle duplicate queries, errors and chain reorganizations (advanced ChainOps lesson).

**Why for M3?** Monitoring worker reads `VoteCast`, decodes and stores relevant events; an alert rule can trigger from decoded data. In this lab we only display and decode, not build full monitoring infrastructure.

## 1.11 What about security and Slither?

Smart contracts can have permanent expensive consequences when deployed. **Slither** inspects Solidity source/static structure and reports possible issues without executing the transaction like a test. Static findings may have false positives/limitations. Compiles pass != tests pass != scanner clean != safe. ChainOps M4 will normalize findings and apply separate policy rules; a scanner error is not a zero-findings success.

## 1.12 Manual review questions (don't ask AI for answers first)

1. Hardhat framework එක, local Hardhat node එක, Sepolia network එක වෙන වෙනම පැහැදිලි කරන්න.
2. `vote(0)` send කළ විට wallet private key එක භාවිතා කරන්නේ කොතැනද?
3. Why does a `view` call not need a signed transaction in a public RPC setup?
4. Why do Sepolia and Mainnet not share vote counts even if the contract source is identical?
5. What does ABI do that bytecode does not?
6. If you have a transaction hash but no receipt, what is actually known?
7. Why would ChainOps keep source commit and compiler version?

## References (current official materials)

- https://ethereum.org/en/developers/docs/networks/
- https://ethereum.org/en/developers/docs/transactions/
- https://hardhat.org/docs/getting-started
- https://hardhat.org/docs/reference/artifacts


---

<!-- SOURCE CHAPTER: docs/02-hardhat-setup-si.md -->
# 02 — VS Code + Hardhat 3 setup: හැම command එකක්ම WHY සමඟ

## Goal

Hardhat installation අවසානයේ generated `Counter` example compile/test කරලා, **project files සහ outputs කොහෙද හදන්නේ** කියලා තේරුම්ගන්න. මේ lesson එකේ SimpleVoting තවම ලියන්නේ නෑ; අත්හදා බලන්නේ toolchain itself.

## Step 2.1 — Install VS Code, Node.js, Git, and Hardhat VS Code extension

**WHAT:** VS Code editor; Node.js JavaScript runtime; npm package manager; Git revision history; official Hardhat VS Code extension (optional productivity aid).

**WHY:** Hardhat 3 TypeScript-based development tools Node.js යටතේ run වෙනවා. Solidity compiler integrations and tests invoke කරන්නේ Hardhat හරහා. VS Code source/config/test navigate කරන්න පහසු කරනවා. Git exact commit එකට artifacts map කිරීම සඳහා ChainOps වල ඉතා වැදගත්.

**Prerequisite:** Official Hardhat 3 documentation says **Node.js >= 22.13.0** (supported versions can change). Prefer a maintained Node.js 22+ compatible version. Check `node -v`, `npm -v`, `git --version` and use official source for installers.

**Why not install Solidity globally?** Hardhat's project toolchain manages compiler versions; global one-off compiler installs reproducibility අඩු කළ හැකියි. **Why not Docker now?** New concepts වැඩි වෙනවා; first run local tooling, later ChainOps M1 Docker worker isolation.

## Step 2.2 — Create a new Hardhat project in your OWN clone

From the root of your **fork clone**:

```bash
mkdir voting-lab
cd voting-lab
npx hardhat --init
```

`npx`: package-specific executable run කරන runner. `hardhat`: Hardhat CLI. `--init`: interactive project setup generate කරන්න කියන option. The CLI may offer packages/plugins; select **Hardhat 3, TypeScript and viem with Node.js test runner** (known official template `node-test-runner-viem`). Choose a single package manager for team exercises; here **npm**. Leave other options at documented defaults unless tutor explains change.

If matching template selection is missing on an entirely empty project, official alternative:

```bash
npx hardhat --init --template node-test-runner-viem
```

`--template node-test-runner-viem`: the named preset chooses a TypeScript/viem testing/deployment example. **Don't run initializer twice on nonempty directory.** `npx` may prompt to fetch Hardhat; be sure package is the official one and versions are compatible.

**EXPECTED:** `hardhat.config.ts`, `package.json`, `contracts/Counter.sol`, `test/Counter.ts`, `ignition/modules/Counter.ts` and possibly `contracts/Counter.t.sol`, `scripts/`, lockfile. Actual generated files depend on template version.

## Step 2.3 — Inspect before changing anything

| File | WHY | What to ask the AI tutor |
|---|---|---|
| `hardhat.config.ts` | compiler/network/plugins config | compiler version, supported network configs මොනවද? |
| `contracts/Counter.sol` | example smart contract source | source එකෙන් state change කරන්නේ කෙසේද? |
| `contracts/Counter.t.sol` (if present) | Solidity tests | Solidity tests vs TS tests difference? |
| `test/Counter.ts` | automation assertions | expected/actual EVM behavior verify කරන්නේ කොහොමද? |
| `ignition/modules/Counter.ts` | deployment declaration | define module vs actually deploy difference? |
| `package.json` / lockfile | installable deps + exact versions | reproducible worker execution එකට ඇයි වැදගත්? |
| `artifacts/` (after build) | compiler output | ABI vs bytecode location? |

**Important:** Run from `voting-lab/` where `hardhat.config.ts` lives. Do not replace generated file content without reading it.

## Step 2.4 — Discover available tasks

```bash
npx hardhat --help
```

`--help` = current installed versionට supported subcommands/options show කරනවා. **WHY:** Old YouTube/blog tutorials often use Hardhat 2 commands or different plugins; installed tooling is source of truth. Check whether `build`, `test`, `node`, `ignition` are available.

## Step 2.5 — Compile/build

```bash
npx hardhat build
```

`build` = Hardhat 3 compilation/build task. It resolves Solidity sources/imports/compiler version; compiler turns Solidity into **ABI**, **bytecode**, and build output. `build` success means syntax/type/compilation constraints met. **Does NOT mean** behavior correct, security safe, or deployed.

**EXPECTED:** terminal compilation report, build artifacts normally in `artifacts/`, caching may make later builds faster. Inspect artifact JSON and note `abi`, `bytecode`; record compiler settings. Some build files are generated, so don't commit caches/irrelevant outputs.

**VERIFY:** Can you identify `Counter` ABI, bytecode? If not, ask tutor to locate based on your actual output. Deliberately introduce a harmless syntax mistake, see compiler error, restore. Explain why compilation failed.

## Step 2.6 — Automated tests

```bash
npx hardhat test
```

`test` = selected test runner executes tests, often against a fast in-memory EVM. It verifies behavior, state changes and reverts. Some tests may deploy fixtures automatically; this **isn't** public Sepolia deployment.

**EXPECTED:** tests pass; count depends on template. Test failure should produce error/nonzero exit code—important signal for ChainOps pipeline gates.

**VERIFY:** Temporarily change one expected assertion, watch failure and restore. Ask AI to explain expected vs actual, not silently fix everything. Verify `build` can pass while `test` fails — that distinction is crucial.

## Step 2.7 — Why do artifacts, configuration and lockfile matter to ChainOps?

M1 worker will clone **exact commit**, install locked deps, run Hardhat `build` + `test`; worker must capture exit status/outputs. M2 uses ABI/bytecode and deployment scripts. M3 uses ABI to decode event logs. M4 needs test evidence and Slither input. ChainOps stores which **commit + tool/compiler versions** produced results, or else later it cannot prove the deployed code matches validated source.

## Common errors / debugging

- **Unsupported Node version:** check `node -v`, update to supported version; don't downgrade Hardhat blindly.
- **No Hardhat config:** confirm terminal `pwd`/`cd` and file exists in `voting-lab`.
- **Unsupported task or plugin:** inspect `npx hardhat --help`, version, generated `package.json`; avoid copying Hardhat 2 guide.
- **Compile error:** read Solidity compiler file/line first; never hide with 'skip'.
- **Test error:** distinguish failed assertion, contract revert, dependency setup, runtime/connection failure.
- **Network/compiler download issue:** could be local connectivity or version; don't confuse with Solidity code error.

## Checkpoint — answer without copying

1. Hardhat කුමක්ද? Hardhat Node කුමක්ද? `solc` කුමක්ද?
2. `npx hardhat build` output එකේ ABI සහ bytecode මොන අරමුණු සඳහාද?
3. Compile pass / test fail එකක් plausible ද? Explain.
4. Why does a ChainOps worker need exact dependency versions and commit SHA?

**Next:** [Lesson 03 — Voting](docs/03-voting-contract-tests-si.md). Official: https://hardhat.org/docs/getting-started


---

<!-- SOURCE CHAPTER: docs/03-voting-contract-tests-si.md -->
# 03 — SimpleVoting contract and tests: source -> logic -> validation

## Goal

Generated `Counter` project එක works කියලා තහවුරු කළ පසු **SimpleVoting** නව contract එකක් create කරනවා. භාවිතා කරන Solidity syntax, tests සහ failure cases තේරුම්ගන්න. Real-world secure election system build කරන එක scope නෙමෙයි.

## Why SimpleVoting rather than NFT or token?

Vote example එකේ mapping, state update, revert, account identity, event emission සියල්ල ඉතා පොඩි Solidity code එකකින් පෙන්වන්න පුළුවන්. ERC tokens/financial logic add කළොත් security/business concepts overwhelm කරනවා. Voting exercise එක **ChainOps M1 Build/Test, M2 Deploy, M3 Events, M4 Policy, M5 Org/Access integration** වලට reusable test repository එකක්.

## Requirements (agreed learning scope)

- Candidates two only: IDs `0` and `1`.
- A specific address can vote once; invalid ID rejected.
- One successful vote increments that candidate's count.
- Successful vote emits `VoteCast` with voter and candidate ID.
- `voteCounts(0)` and `voteCounts(1)` readable.
- No registration, admin, funding, tokens, privacy, secret ballots, user-to-human validation.

## Step 3.1 — Read a minimal contract

File: `voting-lab/contracts/SimpleVoting.sol` (create manually under your fork).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleVoting {
    mapping(address => bool) public hasVoted;
    uint256[2] public voteCounts;

    event VoteCast(address indexed voter, uint256 indexed candidateId);

    function vote(uint256 candidateId) external {
        require(candidateId < 2, "Invalid candidate");
        require(!hasVoted[msg.sender], "Already voted");

        hasVoted[msg.sender] = true;
        voteCounts[candidateId] += 1;
        emit VoteCast(msg.sender, candidateId);
    }
}
```

**WHY every important line?**

- `SPDX-License-Identifier`: source licence metadata; not transaction code.
- `pragma`: compiler compatibility constraint. Compare with actual `hardhat.config.ts` compiler; don't assume exact version is always installed.
- `contract`: named deployment unit; runtime instance exists at an on-chain address after deployment.
- `mapping(address => bool)`: associate wallet address with true/false vote record. Mapping is Solidity storage semantics, not a SQL table.
- `uint256[2]`: fixed-length storage array of two counters. No unlimited candidate system to manage.
- `public`: Solidity creates getter for public state variables, read via ABI.
- `event`: defines an ABI-readable log schema. `indexed` fields can be searched in event topics; data/ABI decode later.
- `external function`: caller can invoke from outside contract. In real network this is a transaction because it changes state.
- `require`: reject invalid actions by revert; successful state change should not be applied when reverting.
- `msg.sender`: caller identity at contract execution; not automatically a real person's identity.
- `emit`: append event log associated with successfully executed transaction.

**Why not store every voter's full data on chain?** More state storage means higher gas and privacy implications. For education, one Boolean per address and two totals is enough.

## Step 3.2 — Build again

```bash
npx hardhat build
```

You already learned `build` in Lesson 02. Now compare generated artifact for `SimpleVoting` with `Counter`: functions and events in ABI differ. **Verify:** `vote`, `voteCounts`, `hasVoted`, `VoteCast` signatures appear; output is compiled, not deployed.

## Step 3.3 — Write tests incrementally

Use your generated `test/Counter.ts` as the installed Hardhat 3 **TypeScript + viem** test pattern. Ask AI to guide **one test at a time**, rather than generating a complete suite. You need wallet/account identities and a fresh deployed contract fixture for isolated tests; check exact APIs against the installed plugin version.

Mandatory cases:

1. First account votes `0`; count becomes `1`.
2. Second account votes `1`; its count becomes `1` while candidate `0` remains unchanged.
3. Same account attempts second vote; **revert** with `Already voted`.
4. Invalid candidate `2` causes revert `Invalid candidate`.
5. Read-only getter returns expected values after successful votes.
6. Successful vote emits `VoteCast` and can be decoded from transaction receipt/log.

**WHY negative tests?** Happy-path only tests miss restrictions, which is precisely the kind of bug that release gates should catch. Try a failed test intentionally before fixing it. Always reset/seed state per test, otherwise votes from earlier tests can cause false failures.

```bash
npx hardhat test
```

Expected: all six behaviors verified. The test names/count may differ based on how you group assertions. **One failed test is a release-block signal**, even if compilation succeeded.

## Step 3.4 — Learn by changing requirements

Ask tutor: 'මම `candidateId < 2` check එක අයින් කළොත් මොකද වෙන්නේ? ඒක test එකකින් අල්ලන්නේ කොහොමද?' Work in feature branch and restore safe logic after experiment. A scanner cannot be a substitute for explicit functional tests. Review error vs revert vs failed assertion.

## Step 3.5 — Same contract, different commit SHA

Make one tiny intentional change (such as event parameter naming or test improvement), commit to your fork; record commit SHA for both versions. Even code changes with no behavioral difference can impact evidence/audit. ChainOps must know **which exact source** produced each build/test/security/deployment result.

## Understand before advancing

- `mapping(address=>bool)` and one-wallet-one-vote limits explain.
- `require` condition fails: contract state and transaction gas behavior explain.
- `event` vs `storage variable` difference explain.
- Why `build` alone cannot validate `vote()` behavior explain.
- How `msg.sender` is determined and why it's not one-human-one-vote explain.

**Next:** [Lesson 04 — local deployment](docs/04-local-node-deploy-si.md).


---

<!-- SOURCE CHAPTER: docs/04-local-node-deploy-si.md -->
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

**Next:** [Lesson 05 — Sepolia](docs/05-sepolia-testnet-si.md). Docs: https://hardhat.org/docs/guides/hardhat-node and https://hardhat.org/docs/guides/deployment/using-ignition


---

<!-- SOURCE CHAPTER: docs/05-sepolia-testnet-si.md -->
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


---

<!-- SOURCE CHAPTER: docs/06-security-events-si.md -->
# 06 — Security scan, event logs, and failure observation

## Goal

Slither analysis එකක් run කරලා findings vs scanner failure difference, EVM event log එකක් ABI එකෙන් decode කරලා `VoteCast` activity trace කරන්න.

## Part A — Why scan when tests pass?

Functional tests mostly verify **specified behavior**. Security analysis known risky patterns find කරන්න උත්සාහ කරනවා. A developer may forget a dangerous interaction not covered by tests; a static analyzer might flag it. But **Slither cannot guarantee security**: false positives, false negatives, unsupported compiler/project, lack of business context all possible. Do not treat 'zero findings' as audit certification.

For our simple contract, scans may yield few/no findings; **that is fine**, don't invent vulnerabilities. If wanting a demonstration of a finding, ask tutor for a clearly marked **separate intentionally vulnerable teaching example** not merged into production/default SimpleVoting. The scan's result must never be fabricated.

## Step A1 — Prepare Slither tools

Slither requires Python runtime and compatible Solidity/project compilation. Official project recommends `uv` installation for current environments; other methods exist. Installation varies per Windows/Linux/macOS and virtual environment. Before installing, check https://github.com/crytic/slither and your OS guide; Docker is optional. On Windows, a Linux environment such as WSL2 may simplify setup, but this is not required if supported installation works.

**Why Python in a Node project?** ChainOps's execution worker may invoke tools written in different languages. Slither itself is Python-based; Hardhat is TS/Node-based. Tooling doesn't need to be same language as app backend.

**Verify setup:** `slither --version` and compiler availability, then run analysis **inside `voting-lab/`**.

```bash
slither .
```

Here `slither` = analyzer executable; `.` = current project (it detects Hardhat compilation framework). It may invoke underlying compilation, import resolution, and consume analyzer resources.

**EXPECTED:** report or analyzer errors; NOT guaranteed to find vulnerabilities. **VERIFY:** record command exit status, tool version, target commit, findings printed. If error: 'scan failed', NOT 'scan passed with 0 findings'.

## Step A2 — How ChainOps turns scanner output into policy

Scanner = technical evidence (`severity`, `rule`, `file`, `line`, description). **Policy** = org/project decision about whether evidence acceptable: e.g. "no HIGH severity findings". Governance is separate from scanner. For lab, write down one hypothetical rule and show what would happen to a real finding; don't claim production security coverage from mock data. M4 later persists structured findings, evaluation results and approvals.

## Part B — Why do contracts emit events?

EVM state stores the latest values (`voteCounts`). Event logs record facts about executed transactions: `VoteCast(voter, candidateId)`. For monitoring/history/analytics, logs are easier to query than reconstructing every storage transition. But logs have chain behavior constraints, and a reverted transaction's event is not committed.

### Step B1 — Read actual logs

After successful local or Sepolia vote, capture transaction receipt; look for its `logs`. Each log has emitting `address`, `topics`, and `data` plus tx/block identity. `indexed` event args usually appear in topics. Decode using the `SimpleVoting` ABI from **the same deployed contract version**. With viem, ask tutor to use a suitable `decodeEventLog` pattern based on current installed API; don't invent decoded results.

### Step B2 — Demonstrate the difference

- `voteCounts(0)` read: **current state**, tells you how many votes candidate 0 has.
- `VoteCast` events: **history of successful votes**, identifies voter address, chosen ID and tx/block.
- `transaction receipt`: **result of a specific transaction**, includes status and logs.

**If a vote reverts:** Count must remain unchanged, no successful `VoteCast` should be persisted for that reverted execution. Observe actual receipt/error behavior.

## Part C — Failure matrix for ChainOps

| Operation | Example failure | Why it matters for backend state |
|---|---|---|
| Build | invalid Solidity syntax | mark compile failure, skip dependent stages |
| Test | duplicate vote unexpectedly succeeds | mark failed tests, prevent release |
| Scan | Slither executable missing | mark scanner ERROR, not clean PASS |
| Policy | observed finding violates rule | BLOCK deployment |
| Deployment | insufficient gas | track tx/submission failure separately |
| Receipt | EVM revert | tx included but failed execution |
| Monitoring | RPC unavailable | retry/track cursor safely, don't invent event |
| Event decode | wrong ABI | mark decode failure, don't mislabel values |

## Checkpoint

1. Why tests + Slither both? Why isn't scanner result a policy decision?
2. Why might zero scan findings not mean safe?
3. State variables vs event logs vs receipts distinction.
4. How does ChainOps know which ABI to use for event decoding?
5. Why should monitoring track chain/block and avoid duplicates?

**Next:** [Lesson 07 — ChainOps mapping](docs/07-chainops-mapping-si.md).


---

<!-- SOURCE CHAPTER: docs/07-chainops-mapping-si.md -->
# 07 — Lab -> Real ChainOps: What will the platform automate?

## Goal

Manual learning output එක ChainOps modules M1–M5 responsibilities වලට map කරලා, integration boundaries clarify කරන්න. අපි මෙහිදී ChainOps platform coding කරන්නේ නැහැ; **we are designing evidence flow from real experience**.

## One real trace from your experiment

```
Git commit SHA
    | GitHub contains Solidity source
    v
M1 builds exact commit -> compiler config + ABI + bytecode
    | Automated tests produce pass/fail evidence
    v
M4 Slither produces real findings/error -> policy passes/blocks
    | Approver reviews context when applicable
    v
M2 deploys exact validated artifact to chain ID X
    | tx hash -> receipt -> deployment status -> contract address
    v
M3 reads ABI-decoded VoteCast events at contract address
    | events -> monitoring rule -> alert (later ChainOps feature)
    v
M5 provides authorized access, project environment, notifications,
   audit and read-only AI assistance across the above.
```

## Every member should be able to explain the other four members' outputs

| Module | Manual lab evidence | What ChainOps builds around it |
|---|---|---|
| M1 Pipeline | `git rev-parse HEAD`, build/test output, artifact | webhook, queue/worker, reproducible checkout, statuses/logs |
| M2 Deployment | deploy module, tx hash, receipt, address | approved deployment requests, signing, confirmations, registry |
| M3 Monitoring | ABI, VoteCast log, block/tx details | indexer, decoding, alert evaluation, monitoring UI |
| M4 Security | Slither findings/error, release rule | findings normalization, policy gate, approval, audit |
| M5 Platform | learner, repo, environment/network settings | accounts/org/projects/RBAC, notifications, authorized AI |

## Most important architectural principle: same validated artifact

Suppose pipeline tests **commit A**. Later someone recompiles code from **commit B** and deploys it. Test results from A no longer prove B. Even if source same, different compiler version/settings could change bytecode. ChainOps needs traceability: **commit SHA + build environment + artifact identity + scan results + policy + approval + deployment tx**.

The lab doesn't need to implement production artifact pinning, but team members must be able to describe why this is a security and audit requirement.

## A simple evidence sheet — complete with real values only

Copy [`templates/deployment-evidence.md`](templates/deployment-evidence.md) and fill using your own observed data. Don't type illustrative fake addresses/hashes as real proof.

## Challenge questions for team viva

1. What happens from `git push` to one compiled contract artifact?
2. How do `test` and Slither differ? Who makes actual PASS/BLOCK decision?
3. Why shouldn't a deployment worker execute a new unvalidated build?
4. What's the difference between `SUBMITTED`, `CONFIRMED`, `REVERTED`, and `ERROR`?
5. How do M3 event logs relate to M2 ABI, tx and contract address?
6. Why does ChainOps need RBAC around approve/deploy endpoints?
7. What if the worker crashes midway or the RPC times out after submission?
8. Why is a GitHub commit a better identity for a build than a branch name alone?

## Stop condition / handoff

All five can independently re-run local workflow; at least one public Sepolia demonstration when practical; each member has documented outputs/limitations and can narrate another module's role. Then decide whether this same repo will be ChainOps template demo input. Only **one** team-agreed reference version should enter organization upstream, if needed.


---

<!-- SOURCE CHAPTER: docs/08-ai-tutor-guide-si.md -->
# 08 — Codex / Claude Code interactive tutoring playbook

## Why an AI tutor rather than 'build the app' prompt?

ඔබට ලැබිය යුතු outcome එක සාර්ථක code files set එකක් පමණක් නෙමෙයි, සෑම command/output එකක්ම explain කරන්න පුළුවන් practical understanding එකක්. Agent එක project එක දවසකින් generate කළොත් learning නොවෙයි. ඒ නිසා `AGENTS.md` and `CLAUDE.md` **teaching contract** ලෙස භාවිතා කරමු.

## First prompt (copy into VS Code assistant; after opening repository root)

```text
Read README.md, AGENTS.md, CLAUDE.md (if you support it),
MASTER_LEARNING_HANDBOOK_SI.md, and docs/00-project-journey-si.md.
Act as a friendly senior Solidity/Hardhat teacher for a complete beginner.
Explain in Sinhala, but keep all technical terms and commands in English.
I have not yet used Web3. Start at Orientation, not code.
First summarize the exact end goal, complete workflow and what we will
NOT build. Ask me two understanding questions. Do NOT edit files or run
commands unless I explicitly approve the next checkpoint.
Only one meaningful checkpoint at a time.
```

## After orientation — next lesson prompt

```text
I finished Orientation and answered the checks. Start Lesson 01,
explaining blockchain, EVM, Solidity, wallet, private key, RPC,
transaction, gas, ABI, bytecode, events, Sepolia, and GitHub forks
in Sinhala with real examples from SimpleVoting.
Stop before showing commands until I understand the concepts.
```

## Actual code step prompt

```text
We are at Lesson 02, Step 2.2. First explain WHAT, WHY, HOW internally,
what this Hardhat 3 command does, each Web3-specific option, what files
it creates, expected terminal output, ways to verify, failure cases,
and connection to ChainOps M1–M5. Then give only this step's command.
Wait for my output before moving to the next checkpoint.
```

## Debugging prompt

```text
Here is my actual terminal output: [PASTE REDACTED OUTPUT].
Please identify the failing layer: Node/toolchain, Solidity compile,
Hardhat test, RPC, wallet/chain ID, gas, transaction revert,
Slither integration, or event decode.
Explain why it happens in Sinhala and show the smallest fix.
Do not change unrelated files or suggest disabling security checks.
Do not ask me to paste keys/tokens/seed phrases.
```

## Explain code prompt

```text
Teach this Solidity/Hardhat code line by line in Sinhala. For each
block explain the state effect, caller/account role, gas/transaction
implication, how a test verifies it, and which ChainOps module needs it.
Do not simply translate syntax. Include two conceptual questions.
```

## Self-test / interview mode

```text
Quiz me orally as a beginner with 5 ChainOps-related questions about
this lesson. One question at a time. Don't show the answer before I try.
After my attempt, correct gaps and give a tiny exercise to verify.
```

## Safety and trust rules

- Never paste secret key, recovery phrase, RPC API key, access token, `.env` with secrets, wallet backup. Replace actual secret spans with `[REDACTED]`.
- Agent must **never claim** transaction succeeded or scan passed without actual observed logs/receipt.
- Agent must use installed Hardhat 3, current docs, generated files rather than Hardhat 2 snippets.
- Ask for explanation of one stage before approvals for file modifications. For big changes, request proposed diff, tests, and rollback plan.
- An AI may have stale knowledge: verify commands/version against docs and `npx hardhat --help`.
- Don't rely on AI for private key storage. Local secure keystore is safer than chat logs.

## Tutor response format — mandatory

```
Lesson / Checkpoint ID
1. WHAT (සිංහලෙන්)
2. WHY (වෙනත් approach නොගෙන ඇයි මෙය?)
3. HOW UNDER THE HOOD (EVM / RPC / compiler / tx path)
4. COMMAND / CODE + explain domain flags
5. EXPECTED OUTPUT (no invented success)
6. VERIFY (exact checks)
7. IF ERROR (likely branches)
8. CHAINOPS CONNECTION (M1...M5)
9. TWO UNDERSTANDING QUESTIONS
STOP: ask for user's real output or answers before next checkpoint.
```

## Example of an unacceptable AI answer

> "Install Hardhat, paste this full voting dApp, run tests and deploy; done." 

## Example of a good AI answer

> "අපි `npx hardhat build` run කරන්නේ source code එක compiler එකට pass කරලා EVM bytecode සහ ABI ජනනය කරන්න. මෙතන deploy වෙන්නේ නැහැ. Build complete වෙලා `artifacts/` ඇතුළේ ABI එක බලමු. දැන් මේ command එක run කරන්න; output එක දෙන්න. ABI එක සහ bytecode එකේ වෙනස ඔබේ වචනවලින් කියන්න."

## Group protocol

In shared session, rotate the person driving screen share; every member still runs the same step on their own fork. One learner explains why, another predicts output, third checks actual output, fourth maps ChainOps, fifth asks failure scenario. Rotate roles per lesson. This ensures nobody becomes just spectator.


---

<!-- SOURCE CHAPTER: docs/09-glossary-faq-si.md -->
# 09 — Web3 Sinhala glossary & beginner FAQ (English tech terms retained)

Use this when you encounter a new concept. Concepts explained in greater depth in Lesson 01.

| Term | සරල අදහස / WHY |
|---|---|
| Blockchain | many nodes maintain shared chain history/state. Ethereum smart-contract execution එකේ context එක. |
| Ethereum | protocol/network ecosystem supporting accounts, EVM, transactions and contracts. |
| EVM | deployed bytecode execute කරන virtual machine. |
| Solidity | EVM smart contracts ලියන source programming language. |
| Smart contract | chain address එකක running code + storage; rules execute with EVM. |
| `solc` | Solidity compiler: code -> bytecode and ABI. |
| Hardhat | developer framework to compile, test, debug, deploy; chain itself නොවේ. |
| Hardhat Node | localhost EVM dev node; public Sepolia නොවේ. |
| Hardhat Ignition | deployment description/execution/records. |
| viem | TypeScript Ethereum client: RPC, ABI, tx, events. |
| Wallet | key management and signing tool; browser wallet optional for CLI use. |
| Account/address | externally visible 0x... identity; address itself is not a key. |
| Private key | allows signing; NEVER expose. |
| Seed/recovery phrase | can recover wallet/key accounts; NEVER expose. |
| Sign | cryptographically authorize transaction without giving key to network. |
| RPC | node API for calls/transaction submission/log queries. |
| Provider | RPC service operator/gateway; not the blockchain itself. |
| Chain ID | network identity; e.g. Sepolia 11155111. |
| Mainnet | real network with real funds; outside this lab. |
| Sepolia | shared Ethereum app-developer testnet; test ETH, independent state. |
| Test ETH | testnet fee currency; not Mainnet ETH. |
| Faucet | service dispensing free limited testnet ETH. |
| Gas | unit of EVM execution/resource work. |
| Gas fee | amount paid on network to process transaction. |
| Transaction | signed state-changing instruction for chain inclusion/execution. |
| Transaction hash | identifier, not automatic evidence of success. |
| Nonce | sender-account transaction sequence mechanism; affects deployment address and duplicate handling. |
| Receipt | result/status/logs/contract address after transaction inclusion. |
| Block confirmation | additional chain evidence after inclusion, per policy. |
| Revert | failed contract execution that rolls back state changes. |
| Contract address | deployed contract instance location on specific chain. |
| ABI | programmatic interface for encode call/decode event. |
| Bytecode | compiled EVM machine instructions; deployment input/runtime code. |
| Artifact | build output containing ABI/bytecode/metadata; ChainOps versioned evidence. |
| Storage | persistent on-chain contract state. |
| Event/log | emitted structured activity record; not same as storage field. |
| `msg.sender` | caller address seen by contract. |
| `mapping` | Solidity key-to-value state map, not SQL table. |
| `require` | runtime condition enforcing rule; revert if false. |
| Slither | static analysis tool, may report findings but not proof of safety. |
| Policy gate | ChainOps decision about whether scan/test evidence permits release. |
| GitHub fork | independent GitHub repo copy linked to upstream. |
| Git clone | local copy of a Git repository. |
| Git `origin` | local clone's remote usually pointing to personal fork. |
| Git `upstream` | remote pointing to organization original. |
| Network fork | advanced local simulation based on remote chain state; **not GitHub fork**. |
| Commit SHA | exact source revision identifier; crucial for ChainOps provenance. |
| RBAC | role-based authorization; ChainOps uses it for approvals/deployments. |

## Questions you're expected to ask (FAQ)

**Q: Why install Hardhat if Solidity code can be edited in VS Code?** VS Code edits text. Hardhat coordinates compilation, tests, artifacts, local EVM and deploy tooling. Editor alone doesn't execute EVM.

**Q: Do I need MetaMask for every lesson?** No; local Hardhat node provides disposable test accounts. Later you need a safe Sepolia signer/test wallet; browser wallet is a possible tool, not mandatory for CLI.

**Q: Can we just start with Sepolia?** Technically yes, but external RPC/faucet/gas/latency creates unnecessary beginner failure layers. Learn local first.

**Q: Is Sepolia real Ethereum?** It is a real publicly operated Ethereum **testnet**, but independent from Ethereum Mainnet and uses test ETH. Not a local simulator and not Mainnet.

**Q: Does a successful contract build mean it is deployed?** No. Build produces files; deployment submits an on-chain transaction to create a contract instance.

**Q: Can every GitHub fork use same deployed contract?** If same network+address and permissions allow, yes; but for individual exercise each member independently deploys own instance. Forking code does not fork blockchain state.

**Q: Why do we have to inspect ABI and bytecode?** ChainOps M2 needs validated deployment artifact; M3 uses ABI to decode event logs. Without this knowledge UI/API can present misleading states.

**Q: Why are addresses or hashes not hard-coded in tutorials?** They're generated from real account/network/nonce and vary across learners. Invented examples are not proof of anything.

**Q: Why is 'test ETH' needed?** Sepolia transactions still use gas; faucet-provided test ETH pays that chain's fees. Local development typically uses pre-funded test accounts.

**Q: If Slither reports no findings, are we safe?** No. Static tools have limits; governance policy also requires tests/review and maybe human approval.

**Q: Why do we care which commit was deployed?** Code may change after testing. ChainOps must tie validation evidence to the exact artifact that was actually deployed.

**Q: Do we need Redis, Docker, PostgreSQL, and a frontend for this lab?** No. This lab teaches manual contract lifecycle first; ChainOps itself later uses queues, Docker workers, DB, APIs, UI to automate and track it.


---
