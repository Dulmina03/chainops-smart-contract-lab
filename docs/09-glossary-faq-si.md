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
