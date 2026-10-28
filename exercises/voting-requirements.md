# SimpleVoting — Exercise acceptance criteria

**Scope:** intentionally small educational demo, not a real election system.

## Contract behavior

1. Exactly two candidates: `0` and `1`.
2. Each **wallet address** can submit at most one successful vote.
3. A valid vote increments the selected candidate's counter by one.
4. Candidate IDs other than `0` and `1` are rejected.
5. A second vote from the same address is rejected.
6. Each successful vote emits `VoteCast(address indexed voter, uint256 indexed candidateId)` or a documented equivalent.
7. Anyone can read the tally; no special admin interface is required.

## Test coverage

- Address A votes for candidate 0 (count changes).
- Address B votes for candidate 1 (count changes).
- Address A repeats vote (revert expected, tally unchanged).
- Address C uses invalid candidate ID (revert expected).
- Event contains correct voter address and candidate ID.
- Build passes and ABI/bytecode are inspectable.

## Deployment and observation

- Local Hardhat node stays running while deploying from another terminal.
- Ignition deployment records observed contract address and chain.
- At least one vote transaction receipt inspected; event decoded using ABI.
- Public Sepolia deployment is a later exercise only after local check passes and free test ETH is available.

## Security and conceptual caveats

- One wallet address ≠ one human.
- Public votes are visible on-chain; do not claim secret ballot.
- No production security audit or real-money deployment.

## Learning proof

Each member records the commands used, meaning of Web3-specific flags, failures encountered, observed output, and ChainOps mapping. Do not include live secrets.
