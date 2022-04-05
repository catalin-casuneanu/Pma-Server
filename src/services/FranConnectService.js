const FranConnectApi = require("../api/FranConnectApi");
const LocationRepository = require("../repositories/Location");
const OwnerRepository = require("../repositories/Owner");

const seedFranchiseLocations = async () => {
  const locations = await FranConnectApi.GetFranchiseLocations();
  await LocationRepository.deleteAll();

  locations.fcResponse.responseData.fimFranchisee.map(
    async (location) => await LocationRepository.save(location)
  );

  return await LocationRepository.getAll();
};

const GetFranchiseLocations = async () => {
  return await LocationRepository.getAll();
};

const SeedFranchiseOwners = async () => {
  const locations = await GetFranchiseLocations();

  OwnerRepository.deleteAll();

  locations.map(async (location) => {
    const owners = await FranConnectApi.GetFranchiseLocationOwner(
      location.referenceId
    );

    if (Array.isArray(owners.fcResponse.responseData.fimCenterInfo.owners)) {
      owners.fcResponse.responseData.fimCenterInfo.owners.map((owner) =>
        OwnerRepository.save(owner.fimOwner, location.referenceId)
      );
    } else {
      OwnerRepository.save(
        owners.fcResponse.responseData.fimCenterInfo.owners.fimOwner,
        location.referenceId
      );
    }
  });

  return await OwnerRepository.getAll();
};

const GetFranchiseOwners = async () => {
  return await OwnerRepository.getAll();
};

module.exports = {
  seedFranchiseLocations,
  GetFranchiseLocations,
  SeedFranchiseOwners,
  GetFranchiseOwners,
};
