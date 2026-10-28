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
