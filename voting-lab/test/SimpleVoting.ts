import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";

describe("SimpleVoting", function () {
  it("starts both candidate totals at zero", async function () {
    const { viem } = await network.create();
    const voting = await viem.deployContract("SimpleVoting");

    assert.equal(await voting.read.voteCounts([0n]), 0n);
    assert.equal(await voting.read.voteCounts([1n]), 0n);
  });
  it("marks a fresh account as not voted", async function () {
  const { viem } = await network.create();
  const voting = await viem.deployContract("SimpleVoting");
  const [voter] = await viem.getWalletClients();

  assert.equal(
    await voting.read.hasVoted([voter.account.address]),
    false,
  );
});
it("rejects an invalid candidate", async function () {
  const { viem } = await network.create();
  const voting = await viem.deployContract("SimpleVoting");

  await viem.assertions.revertWith(
    voting.write.vote([2n]),
    "Invalid candidate",
  );
});
it("adds a vote to candidate 0 only", async function () {
  const { viem } = await network.create();
  const voting = await viem.deployContract("SimpleVoting");

  await voting.write.vote([0n]);

  assert.equal(await voting.read.voteCounts([0n]), 1n);
  assert.equal(await voting.read.voteCounts([1n]), 0n);
});
it("rejects a second vote from the same account", async function () {
  const { viem } = await network.create();
  const voting = await viem.deployContract("SimpleVoting");
  const [voter] = await viem.getWalletClients();

  await voting.write.vote([0n], { account: voter.account });

  assert.equal(
    await voting.read.hasVoted([voter.account.address]),
    true,
  );

  await viem.assertions.revertWith(
    voting.write.vote([1n], { account: voter.account }),
    "Already voted",
  );

  assert.equal(await voting.read.voteCounts([0n]), 1n);
  assert.equal(await voting.read.voteCounts([1n]), 0n);
});
it("allows different accounts to vote for different candidates", async function () {
  const { viem } = await network.create();
  const voting = await viem.deployContract("SimpleVoting");
  const [voterA, voterB] = await viem.getWalletClients();

  await voting.write.vote([0n], { account: voterA.account });
  assert.equal(await voting.read.voteCounts([0n]), 1n);

  await voting.write.vote([1n], { account: voterB.account });

  assert.equal(await voting.read.voteCounts([0n]), 1n);
  assert.equal(await voting.read.voteCounts([1n]), 1n);
});
});