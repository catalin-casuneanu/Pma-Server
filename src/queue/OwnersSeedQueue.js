const Queue = require("bull");
const FranConnectService = require("../services/FranConnectService");

const job = await Queue.add(
  {
    seed: await FranConnectService.SeedFranchiseOwners(),
  },
  {
    repeat: {
      cron: "*/10 * * * *",
    },
  }
);
