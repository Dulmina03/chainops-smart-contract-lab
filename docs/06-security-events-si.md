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

**Next:** [Lesson 07 — ChainOps mapping](07-chainops-mapping-si.md).
