const { ChainedTokenCredential, ClientSecretCredential } = require('@azure/identity')
const { SecretClient } = require('@azure/keyvault-secrets')
const minimist = require('minimist')
const dotenv = require('dotenv')
const params = minimist(process.argv)
const path = `./config/.env`
const index = dotenv.config({ path }).parsed

//const credential = new DefaultAzureCredential()
const tenantId = process.env.tenantId;
const clientId=process.env.clientId; 
const clientSecret=process.env.clientSecret;

const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const secondCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);


const url = `https://dev-keyvault-ocb.vault.azure.net`

//const client = new SecretClient(url, credential)
const client = new SecretClient(url, credentialChain)



async function getVault (secretList) {
  let model = {}
  for (const secret of secretList) {
    const value = await client.getSecret(secret)
    model[secret] = value.value || null
  }
  return model
}

module.exports = {
  getVault,
}
