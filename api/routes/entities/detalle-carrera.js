'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, DetalleCarrera

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      DetalleCarrera = services.DetalleCarrera
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit,  idDetalleCarrera, epc, carrera,
    fechaLectura, rssi,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await DetalleCarrera.findAll({
      where: {
        idDetalleCarrera, epc, carrera,
    fechaLectura, rssi,
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
  const {idDetalleCarrera, epc, carrera,
    fechaLectura, rssi, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await DetalleCarrera.findOne({
      where: {
        idDetalleCarrera, epc, carrera,
    fechaLectura, rssi,
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
    result = await DetalleCarrera.findById(id)
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.post('/createOrUpdate', async (req, res, next) => {
  const model = req.body
  
  let obj = null
  //dina
  try {
    obj = await DetalleCarrera.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const {  idDetalleCarrera } = req.query
  
  try {
    result = await DetalleCarrera.remove({
      where: {
        idDetalleCarrera
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
