const Queue = require("bull");
const FranConnectService = require("../services/FranConnectService");

let OwnersSeedQueue = new Queue("ownersSeed", {
  defaultJobOptions: {
    removeOnComplete: true,
  },
});

OwnersSeedQueue.add(
  {
    seed: await FranConnectService.SeedFranchiseOwners(),
  },
  {
    repeat: {
      cron: "* * * * *",
    },
  }
);

OwnersSeedQueue.on("failed", function (job, err) {
  workerLogger.error("job " + job.id + " in queue failed... " + err);
})
  .on("error", function (err) {
    workerLogger.error("Queue Error... " + err);
  })
  .on("stalled", function (job) {
    workerLogger.info(
      `stalled job, restarting it again! ${job.queue.name} ${JSON.stringify(
        job.data
      )} ${job.id} ${job.name}`
    );
  });
