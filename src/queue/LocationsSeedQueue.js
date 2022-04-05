const Queue = require("bull");
const FranConnectService = require("../services/FranConnectService");

let LocationsSeedQueue = new Queue("locationsSeed", {
  defaultJobOptions: {
    removeOnComplete: true,
  },
});

LocationsSeedQueue.add(
  {
    seed: await FranConnectService.seedFranchiseLocations(),
  },
  {
    repeat: {
      cron: "* * * * *",
    },
  }
);

LocationsSeedQueue.on("failed", function (job, err) {
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
