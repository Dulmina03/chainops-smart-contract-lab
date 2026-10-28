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

**Next:** [Lesson 02 Hardhat](02-hardhat-setup-si.md).
