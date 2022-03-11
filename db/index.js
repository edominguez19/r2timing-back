'use strict'

const { getConfig } = require('../config')
const setupDatabase = require('./libs/db')
/* Models */


const setupParticipanteModel = require('./models/participante')

/*Libs*/


const setupParticipante = require('./libs/participante')

module.exports = async function () {
  const configEnv = await getConfig()
  const { db } = configEnv
  const config = {
    logging: console.log,
    query: {
      raw: true,
    },
    ...db.main,
  }
  const sequelize = setupDatabase(config)
 

  const ParticipanteModel = setupParticipanteModel(config)

  await sequelize.authenticate()

 

  const Participante = setupParticipante(ParticipanteModel)

  return {
 
    Participante,
  }
}
