# Learning-lab contributions and GitHub workflow

## 1. Upstream vs member forks

- Organization upstream initially contains **guides only**, NOT generated Hardhat app.
- Each member creates personal fork, clones it, initializes `voting-lab/` locally.
- Keep practical work in personal fork/feature branch. **Do not merge five duplicate generated projects to organization upstream.**
- Once everyone has learned, team can peer-review and choose **one** reference implementation as a separate decision.

## 2. Git conventions (aligned to ChainOps policy)

For a tracked issue use `<type>/issue-<actual-number>-<topic>` e.g. `chore/issue-12-hardhat-initialization`, `feat/issue-14-voting-contract-tests`, `docs/issue-16-learning-notes`. Use the **real** issue number, not examples copied literally.

Conventional commits: `<type>(<scope>): <action>` e.g. `chore(repo): initialize hardhat lab`, `feat(m2): add local voting deployment module`, `test(m1): cover duplicate votes`, `docs(repo): explain transaction receipts`.

PRs, when needed for shared guidance/reference code, follow the same convention with short Summary, Changes, Test/verification, and `Closes #ISSUE` only if fully completed (and be aware cross-repo fork PR closure may vary). At least one peer review. One meaningful change can be one commit.

## 3. What to submit as learning proof

- Personal fork URL + relevant source commit SHA.
- Self-authored explanation: what/why/how/verification for one domain command.
- Actual build/test output, contract address/tx hashes only when real, redacted logs.
- Personal `templates/learning-log.md` copy or evidence template.
- Two quiz answers per stage.
- A failure scenario and how it was diagnosed.

## 4. Don't commit

- `.env`, keys/private keys, seed/recovery phrases, credentials, API tokens, keystore passwords, wallet backups, real fund wallets, node_modules/caches.
- Do not copy terminal output containing secrets or leak a browser wallet recovery phrase through screenshots.
- If secrets are accidentally committed, treat them compromised even after deletion; rotate/revoke and seek help. Removing a file from the latest commit doesn't erase past history.

## 5. Branch/push discipline

- `origin` = own fork; `upstream` = org original. Verify `git remote -v` before push.
- Prefer small, reviewable commits and preserve everyone else's learning changes.
- Never force-push shared branches to fix a learning typo without discussion.
- If upstream lessons change, use GitHub **Sync fork** after committing your work. Don't reset personal exercise work.
