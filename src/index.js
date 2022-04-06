const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const {
  GetFranchiseLocations,
  GetFranchiseOwners,
  seedFranchiseLocations,
  SeedFranchiseOwners,
} = require("./services/FranConnectService");

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan("combined"));

app.get("/location", async (req, res) => {
  locations = await GetFranchiseLocations();
  res.status(200).json(locations);
});

app.get("/owner", async (req, res) => {
  owners = await GetFranchiseOwners();
  res.status(200).json(owners);
});

app.post("/seed", async (res, req) => {
  const type = res.body.type;

  switch (type) {
    case "location":
      const locations = await seedFranchiseLocations();
      res.status(20).json({ message: "ok", data: locations });
      break;
    case "owner":
      const owners = await SeedFranchiseOwners();
      res.status(20).json({ message: "ok", data: owners });
      break;
    default:
      res.status(400).json({ message: "Unknown type." });
      break;
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
