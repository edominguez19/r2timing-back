const minimist = require('minimist')
const { getVault } = require('./KeyVault')
const params = minimist(process.argv)
const dotenv = require('dotenv')
const path = `./config/${params.prod && params.prod === 'true'
  ? '.env'
  : '.env-dev'}`
const index = dotenv.config({ path }).parsed

getConfig ()
async function getConfig () {

  const model = {
    db: {
      main: {
        host: index.DB_HOST,
        port: index.DB_PORT,
        database: index.DB_DB,
        username: index.DB_USER,
        password: index.DB_PASSWD,
        dialect: index.DB_DIALECT,
        dialectOptions: {
          dateStrings: true,
          typeCast: true,
        },
      },
    },
    services: {
      port: index.API_PORT,
      socket: index.API_SOCKET,
      secret: index.SECRET,
      sessionTime: index.SESSION_TIME,
    },
    microServicios: {
      tiempoVigencia: index.OPTVALIDATIONTIME,
      // tiempoVigencia: 30,
    },
  }
  return model
}

module.exports = {
  getConfig,
  // db: {
  //   main: {
  //     host: index.DB_HOST,
  //     port: index.DB_PORT,
  //     database: index.DB_DB,
  //     username: index.DB_USER,
  //     password: index.DB_PASSWD,
  //     dialect: index.DB_DIALECT,
  //     dialectOptions: {
  //       dateStrings: true,
  //       typeCast: true,
  //     },
  //   },
  // },
  // services: {
  //   port: index.API_PORT,
  //   socket: index.API_SOCKET,
  //   secret: index.SECRET,
  //   sessionTime: index.SESSION_TIME,
  // },
  // microServicios: {
  //   tiempoVigencia: index.OPT_VALIDATION_TIME,
  // },
}
