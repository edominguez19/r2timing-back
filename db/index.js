'use strict'

const { getConfig } = require('../config')
const setupDatabase = require('./libs/db')
/* Models */


const setupParticipanteModel = require('./models/participante')
const setupCabeceraInscripcioModel = require('./models/cabecera-inscripcion')
const setupCarreraCategoriaModel = require('./models/carrera-categoria')
const setupCarreraModel = require('./models/carrera')
const setupCategoriaModel = require('./models/categoria')
const setupDetalleCarreraModel = require('./models/detalle-carrera')
const setupDetalleInscripcionModel = require('./models/detalle-inscripcion')
const setupDistanciaModel = require('./models/distancia')
const setupPermisosModel = require('./models/permiso')
const setupRolPermisosModel = require('./models/rol-permiso')
const setupRolModel = require('./models/rol')
const setupUsuarioModel = require('./models/usuario')
/*Libs*/


const setupParticipante = require('./libs/participante')
const setupCabeceraInscripcio = require('./libs/cabecera-inscripcion')
const setupCarreraCategoria= require('./libs/carrera-categoria')
const setupCarrera = require('./libs/carrera')
const setupCategoria = require('./libs/categoria')
const setupDetalleCarrera = require('./libs/detalle-carrera')
const setupDetalleInscripcion = require('./libs/detalle-inscripcion')
const setupDistancia = require('./libs/distancia')
const setupPermisos = require('./libs/permiso')
const setupRolPermisos= require('./libs/rol-permiso')
const setupRol = require('./libs/rol')
const setupUsuario = require('./libs/usuario')
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
  const CabeceraInscripcioModel = setupCabeceraInscripcioModel(config)
   const CarreraCategoriaModel = setupCarreraCategoriaModel(config)
   const CarreraModel = setupCarreraModel(config)
   const CategoriaModel = setupCategoriaModel(config)
   const DetalleCarreraModel = setupDetalleCarreraModel(config)
   const DetalleInscripcionModel = setupDetalleInscripcionModel(config)
   const DistanciaModel = setupDistanciaModel(config)
  const PermisosModel = setupPermisosModel(config)
   const RolModel = setupRolModel(config)
   const RolPermisosModel = setupRolPermisosModel(config)
  const UsuarioModel = setupUsuarioModel(config)


  await sequelize.authenticate()



  const Participante = setupParticipante(ParticipanteModel)
  const CabeceraInscripcio = setupCabeceraInscripcio(CabeceraInscripcioModel)
   const CarreraCategoria = setupCarreraCategoria(CarreraCategoriaModel)
   const Carrera = setupCarrera(CarreraModel)
   const Categoria = setupCategoria(CategoriaModel)
   const DetalleCarrera = setupDetalleCarrera(DetalleCarreraModel)
   const DetalleInscripcion = setupDetalleInscripcion(DetalleInscripcionModel)
   const Distancia = setupDistancia(DistanciaModel)
   const Permisos = setupPermisos(PermisosModel)
   const Rol = setupRol(RolModel)
   const RolPermisos = setupRolPermisos(RolPermisosModel)
   const Usuario = setupUsuario(UsuarioModel)

  return {
    
    Participante,
     CabeceraInscripcio,
     CarreraCategoria,
     Carrera,
     Categoria,
     DetalleCarrera,
     DetalleInscripcion,
     Distancia,
     Permisos,
     Rol,
    RolPermisos,
     Usuario
  }
}
