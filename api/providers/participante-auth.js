'use strict'
const db = require('../../db')

async function consultarDatosPersonales ({ ci }) {
  const services = await db()
  return new Promise(async (resolve, reject) => {
    try {
      const modelo = await services.Participante.findOne(
        { where: { ci } })
      if (modelo) {
        resolve({ mensaje: 'OK', resultado: modelo || {} })
      } else {
        resolve({
          mensaje: 'No existe datos con la informacion proporcionada',
          resultado: {},
        })
      }
    } catch (e) {
      reject({
        mensaje: 'No existe datos con la informacion proporcionada',
        resultado: e,
      })
    }
  })
}

module.exports = { consultarDatosPersonales }
