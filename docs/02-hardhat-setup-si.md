# 02 — VS Code + Hardhat 3 setup: හැම command එකක්ම WHY සමඟ

## Goal

Hardhat installation අවසානයේ generated `Counter` example compile/test කරලා, **project files සහ outputs කොහෙද හදන්නේ** කියලා තේරුම්ගන්න. මේ lesson එකේ SimpleVoting තවම ලියන්නේ නෑ; අත්හදා බලන්නේ toolchain itself.

## Step 2.1 — Install VS Code, Node.js, Git, and Hardhat VS Code extension

**WHAT:** VS Code editor; Node.js JavaScript runtime; npm package manager; Git revision history; official Hardhat VS Code extension (optional productivity aid).

**WHY:** Hardhat 3 TypeScript-based development tools Node.js යටතේ run වෙනවා. Solidity compiler integrations and tests invoke කරන්නේ Hardhat හරහා. VS Code source/config/test navigate කරන්න පහසු කරනවා. Git exact commit එකට artifacts map කිරීම සඳහා ChainOps වල ඉතා වැදගත්.

**Prerequisite:** Official Hardhat 3 documentation says **Node.js >= 22.13.0** (supported versions can change). Prefer a maintained Node.js 22+ compatible version. Check `node -v`, `npm -v`, `git --version` and use official source for installers.

**Why not install Solidity globally?** Hardhat's project toolchain manages compiler versions; global one-off compiler installs reproducibility අඩු කළ හැකියි. **Why not Docker now?** New concepts වැඩි වෙනවා; first run local tooling, later ChainOps M1 Docker worker isolation.

## Step 2.2 — Create a new Hardhat project in your OWN clone

From the root of your **fork clone**:

```bash
mkdir voting-lab
cd voting-lab
npx hardhat --init
```

`npx`: package-specific executable run කරන runner. `hardhat`: Hardhat CLI. `--init`: interactive project setup generate කරන්න කියන option. The CLI may offer packages/plugins; select **Hardhat 3, TypeScript and viem with Node.js test runner** (known official template `node-test-runner-viem`). Choose a single package manager for team exercises; here **npm**. Leave other options at documented defaults unless tutor explains change.

If matching template selection is missing on an entirely empty project, official alternative:

```bash
npx hardhat --init --template node-test-runner-viem
```

`--template node-test-runner-viem`: the named preset chooses a TypeScript/viem testing/deployment example. **Don't run initializer twice on nonempty directory.** `npx` may prompt to fetch Hardhat; be sure package is the official one and versions are compatible.

**EXPECTED:** `hardhat.config.ts`, `package.json`, `contracts/Counter.sol`, `test/Counter.ts`, `ignition/modules/Counter.ts` and possibly `contracts/Counter.t.sol`, `scripts/`, lockfile. Actual generated files depend on template version.

## Step 2.3 — Inspect before changing anything

| File | WHY | What to ask the AI tutor |
|---|---|---|
| `hardhat.config.ts` | compiler/network/plugins config | compiler version, supported network configs මොනවද? |
| `contracts/Counter.sol` | example smart contract source | source එකෙන් state change කරන්නේ කෙසේද? |
| `contracts/Counter.t.sol` (if present) | Solidity tests | Solidity tests vs TS tests difference? |
| `test/Counter.ts` | automation assertions | expected/actual EVM behavior verify කරන්නේ කොහොමද? |
| `ignition/modules/Counter.ts` | deployment declaration | define module vs actually deploy difference? |
| `package.json` / lockfile | installable deps + exact versions | reproducible worker execution එකට ඇයි වැදගත්? |
| `artifacts/` (after build) | compiler output | ABI vs bytecode location? |

**Important:** Run from `voting-lab/` where `hardhat.config.ts` lives. Do not replace generated file content without reading it.

## Step 2.4 — Discover available tasks

```bash
npx hardhat --help
```

`--help` = current installed versionට supported subcommands/options show කරනවා. **WHY:** Old YouTube/blog tutorials often use Hardhat 2 commands or different plugins; installed tooling is source of truth. Check whether `build`, `test`, `node`, `ignition` are available.

## Step 2.5 — Compile/build

```bash
npx hardhat build
```

`build` = Hardhat 3 compilation/build task. It resolves Solidity sources/imports/compiler version; compiler turns Solidity into **ABI**, **bytecode**, and build output. `build` success means syntax/type/compilation constraints met. **Does NOT mean** behavior correct, security safe, or deployed.

**EXPECTED:** terminal compilation report, build artifacts normally in `artifacts/`, caching may make later builds faster. Inspect artifact JSON and note `abi`, `bytecode`; record compiler settings. Some build files are generated, so don't commit caches/irrelevant outputs.

**VERIFY:** Can you identify `Counter` ABI, bytecode? If not, ask tutor to locate based on your actual output. Deliberately introduce a harmless syntax mistake, see compiler error, restore. Explain why compilation failed.

## Step 2.6 — Automated tests

```bash
npx hardhat test
```

`test` = selected test runner executes tests, often against a fast in-memory EVM. It verifies behavior, state changes and reverts. Some tests may deploy fixtures automatically; this **isn't** public Sepolia deployment.

**EXPECTED:** tests pass; count depends on template. Test failure should produce error/nonzero exit code—important signal for ChainOps pipeline gates.

**VERIFY:** Temporarily change one expected assertion, watch failure and restore. Ask AI to explain expected vs actual, not silently fix everything. Verify `build` can pass while `test` fails — that distinction is crucial.

## Step 2.7 — Why do artifacts, configuration and lockfile matter to ChainOps?

M1 worker will clone **exact commit**, install locked deps, run Hardhat `build` + `test`; worker must capture exit status/outputs. M2 uses ABI/bytecode and deployment scripts. M3 uses ABI to decode event logs. M4 needs test evidence and Slither input. ChainOps stores which **commit + tool/compiler versions** produced results, or else later it cannot prove the deployed code matches validated source.

## Common errors / debugging

- **Unsupported Node version:** check `node -v`, update to supported version; don't downgrade Hardhat blindly.
- **No Hardhat config:** confirm terminal `pwd`/`cd` and file exists in `voting-lab`.
- **Unsupported task or plugin:** inspect `npx hardhat --help`, version, generated `package.json`; avoid copying Hardhat 2 guide.
- **Compile error:** read Solidity compiler file/line first; never hide with 'skip'.
- **Test error:** distinguish failed assertion, contract revert, dependency setup, runtime/connection failure.
- **Network/compiler download issue:** could be local connectivity or version; don't confuse with Solidity code error.

## Checkpoint — answer without copying

1. Hardhat කුමක්ද? Hardhat Node කුමක්ද? `solc` කුමක්ද?
2. `npx hardhat build` output එකේ ABI සහ bytecode මොන අරමුණු සඳහාද?
3. Compile pass / test fail එකක් plausible ද? Explain.
4. Why does a ChainOps worker need exact dependency versions and commit SHA?

**Next:** [Lesson 03 — Voting](03-voting-contract-tests-si.md). Official: https://hardhat.org/docs/getting-started
