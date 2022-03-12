'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, CabeceraInscripcio

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      CabeceraInscripcio = services.CabeceraInscripcio
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit, idCabeceraInscripcion, fechaInscripcion, reciboPago,
    epc, numero, Participante_idParticipante, CarreraCategoria_idCarreraCategoria,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await CabeceraInscripcio.findAll({
      where: {
        idCabeceraInscripcion, fechaInscripcion, reciboPago,
        epc, numero, Participante_idParticipante, CarreraCategoria_idCarreraCategoria,
      },
      pageSize: parseInt(_limit || 1000),
      page: parseInt(_page || 1) - 1,
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.get('/findOne', async (req, res, next) => {
  const { idCabeceraInscripcion, fechaInscripcion, reciboPago,
    epc, numero, Participante_idParticipante, CarreraCategoria_idCarreraCategoria, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await CabeceraInscripcio.findOne({
      where: {
        idCabeceraInscripcion, fechaInscripcion, reciboPago,
        epc, numero, Participante_idParticipante, CarreraCategoria_idCarreraCategoria,
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.get('/findById', async (req, res, next) => {
  const { id } = req.args
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await CabeceraInscripcio.findById(id)
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.post('/createOrUpdate', async (req, res, next) => {
  const model = req.body

  let obj = null
  try {
    obj = await CabeceraInscripcio.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const { idCabeceraInscripcion } = req.query

  try {
    result = await CabeceraInscripcio.remove({
      where: {
        idCabeceraInscripcion
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
