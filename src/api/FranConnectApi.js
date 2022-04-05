/**
 * Packages Import
 */
const axios = require("axios").default;

/**
 * Env Import
 */
const franconnectUrl = process.env.FRANCONNECT_ACCESS_TOKEN_URL;
const franconnectClientId = process.env.FRANCONNECT_CLIENT_ID;
const franconnectClientSecret = process.env.FRANCONNECT_CLIENT_SECRET;

/**
 * Components Import
 */
const AccessTokenRepository = require("../repositories/AccessToken");

const GetAccessToken = async () => {
  let token = await AccessTokenRepository.get();
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  if (token && token.expireDate >= Date.now()) return token.value;

  const response = await axios({
    method: "post",
    url: franconnectUrl,
    auth: {
      username: franconnectClientId,
      password: franconnectClientSecret,
    },
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  await AccessTokenRepository.save(response);

  return (await AccessTokenRepository.get()).value;
};

const GetFranchiseLocations = async () => {
  const token = await GetAccessToken();
  const params = new URLSearchParams();
  params.append("module", "fim");
  params.append("subModule", "franchisee");
  params.append(
    "filterXML",
    "<fcRequest><filter><status>Active Franchisees</status></filter></fcRequest>"
  );
  params.append("responseType", "json");

  return await axios({
    method: "post",
    url: "https://puroclean.franconnect.net/fc/rest/dataservices/retrieve",
    data: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const GetFranchiseLocationOwner = async (referenceId) => {
  const token = await GetAccessToken();
  const params = new URLSearchParams();
  params.append("module", "fim");
  params.append("subModule", "owner");
  params.append(
    "filterXML",
    `<fcRequest><filter><referenceId>${referenceId}</referenceId></filter></fcRequest>`
  );
  params.append("responseType", "json");

  return await axios({
    method: "post",
    url: "https://puroclean.franconnect.net/fc/rest/dataservices/retrieve",
    data: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  GetAccessToken,
  GetFranchiseLocations,
  GetFranchiseLocationOwner,
};
