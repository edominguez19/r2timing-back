'use strict'

const db = require('../index')

async function run () {
  const dbModel = await db().catch(handleFatalError)
  // const result = await  dbModel.Plantilla.findOne({codigo: 'TERMINOS_CONDICIONES_RDC'});
  const result = await dbModel.Catalogo.findAll(
    { where: {}, pageSize: 10, page: 0})
  console.log(result)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
