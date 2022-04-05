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
  locations = await seedFranchiseLocations();
  res.status(200).json(locations);
});

app.get("/owner", async (req, res) => {
  owners = await SeedFranchiseOwners();
  res.status(200).json(owners);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
