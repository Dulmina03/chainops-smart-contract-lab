# ChainOps Smart Contract Lab — Sinhala-first beginner learning repo

**Team:** IntelliCoders (5 members) · **Lab:** SimpleVoting · **Toolchain:** VS Code + Hardhat 3 + Solidity + TypeScript/viem · **Purpose:** understand and manually perform the lifecycle that ChainOps will later automate.

> **Start with the big picture, not code.**
> 1. Read [00 — Project Journey](docs/00-project-journey-si.md) (what/why/end result).
> 2. Read the full [Master Learning Handbook (සිංහල)](MASTER_LEARNING_HANDBOOK_SI.md) or follow lessons one at a time.
> 3. Ask Codex/Claude Code to follow [`AGENTS.md`](AGENTS.md) and [`docs/08-ai-tutor-guide-si.md`](docs/08-ai-tutor-guide-si.md).

## What is this lab?

A tiny wallet-address voting smart contract you personally **compile -> test -> deploy locally -> interact -> inspect receipts/logs -> optionally deploy to Sepolia -> analyze with Slither -> map to ChainOps**.

**NOT:** A production voting system, full DApp, mainnet deployment, fake UI demo, new blockchain or ChainOps product implementation.

## End-to-end learning map

```
Read concept -> inspect generated Hardhat Counter starter
  -> create SimpleVoting.sol -> build/test -> ABI/bytecode
  -> Hardhat local node -> Ignition local deploy
  -> signed vote -> receipt/state/event -> Sepolia (after local proof)
  -> security analysis and event decoding -> map to ChainOps M1–M5
```

## Lessons (Sinhala, English technical terms)

| Order | Lesson | Deliverable |
|---|---|---|
| **0 (READ FIRST)** | [Project Journey](docs/00-project-journey-si.md) | Explain goal and finished demo |
| 0B | [Repository & Fork](docs/00-start-here-si.md) | Own GitHub fork + correct remotes |
| 1 | [Web3 Foundations](docs/01-web3-foundations-si.md) | Explain wallet/EVM/RPC/gas/ABI |
| 2 | [VS Code + Hardhat](docs/02-hardhat-setup-si.md) | Generated Counter build/test |
| 3 | [SimpleVoting + Tests](docs/03-voting-contract-tests-si.md) | Contract + valid/invalid tests |
| 4 | [Local Node + Deployment](docs/04-local-node-deploy-si.md) | Actual local tx/receipt/events |
| 5 | [Sepolia](docs/05-sepolia-testnet-si.md) | Optional public testnet proof |
| 6 | [Slither + Event Logs](docs/06-security-events-si.md) | Real findings/scan state + event decode |
| 7 | [ChainOps Connection](docs/07-chainops-mapping-si.md) | Commit-to-contract trace sheet |
| Support | [AI Tutor Guide](docs/08-ai-tutor-guide-si.md) | Copyable prompts & session format |
| Support | [Glossary + FAQ](docs/09-glossary-faq-si.md) | Look up confusing terms |

## What is already in the organization repository?

Only README, `MASTER_LEARNING_HANDBOOK_SI.md`, docs, AI tutor rules, contribution policy, templates, and issue/checkpoint guidance. **Do not add `voting-lab/` to upstream initially.** Every member forks/clones first, then initializes an empty `voting-lab/` in their own fork.

## First commands — only after Orientation + Foundations

```bash
# Run these inside your OWN clone, not the organization main repo.
mkdir voting-lab
cd voting-lab
npx hardhat --init
npx hardhat --help
npx hardhat build
npx hardhat test
```

`--init` generates the Hardhat project and default Counter example. **Learn the output first** before replacing it. Current Hardhat 3 docs require Node.js >= 22.13.0; check latest supported versions. Full command explanations in Lesson 02. No wallet, MetaMask, faucet or Sepolia needed to reach this milestone.

## Ask an AI tutor to begin

```text
Read AGENTS.md, README.md, docs/00-project-journey-si.md
and MASTER_LEARNING_HANDBOOK_SI.md.
Teach me in Sinhala, preserving English technical terms.
Start at Orientation: explain the complete end goal and each stage WHY.
I am a complete Web3 beginner. Ask two questions and wait for my answers.
Do NOT edit code or run commands until I request the next checkpoint.
```

## Team rules and verification

- Everyone runs the same manual exercises in personal forks; share knowledge and peer-review results.
- `origin` is your fork, `upstream` is organization repo; do not merge five duplicate Hardhat projects.
- Never include private keys, seed phrases, keystore passwords, `.env`, RPC API keys, production wallets or real money.
- A failed Slither run is not a clean scan. A tx hash is not proof of successful deployment.
- Every stage needs evidence and an explanation of WHY, not only screenshots.
- Use [individual evidence template](templates/deployment-evidence.md), [learning log](templates/learning-log.md), [completion rubric](exercises/team-demo-rubric.md).

## Official documentation links (verify when tool versions update)

- [Hardhat 3](https://hardhat.org/docs/getting-started)
- [Hardhat configuration/secrets](https://hardhat.org/docs/guides/configuration-variables)
- [Ignition deployment](https://hardhat.org/docs/guides/deployment/using-ignition)
- [Ethereum networks / Sepolia / faucet resources](https://ethereum.org/en/developers/docs/networks/)
- [GitHub fork/remotes](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/configuring-a-remote-repository-for-a-fork)
- [Slither](https://github.com/crytic/slither)
