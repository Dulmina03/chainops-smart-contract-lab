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
});