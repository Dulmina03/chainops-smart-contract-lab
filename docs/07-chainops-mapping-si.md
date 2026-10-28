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

Copy [`templates/deployment-evidence.md`](../templates/deployment-evidence.md) and fill using your own observed data. Don't type illustrative fake addresses/hashes as real proof.

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
