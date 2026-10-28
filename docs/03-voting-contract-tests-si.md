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

**Next:** [Lesson 04 — local deployment](04-local-node-deploy-si.md).
