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
