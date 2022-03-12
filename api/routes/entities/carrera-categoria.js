'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, CarreraCategoria

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      CarreraCategoria = services.CarreraCategoria
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit, idCarreraCategoria, Carrera_idCarrera, Categoria_idCategoria,
    Distancia_idDistancia,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await CarreraCategoria.findAll({
      where: {
        idCarreraCategoria, Carrera_idCarrera, Categoria_idCategoria,
        Distancia_idDistancia,
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
  const { idCarreraCategoria, Carrera_idCarrera, Categoria_idCategoria,
    Distancia_idDistancia, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await CarreraCategoria.findOne({
      where: {
        idCarreraCategoria, Carrera_idCarrera, Categoria_idCategoria,
    Distancia_idDistancia,
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
    result = await CarreraCategoria.findById(id)
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.post('/createOrUpdate', async (req, res, next) => {
  const model = req.body

  let obj = null

  try {
    obj = await CarreraCategoria.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const { idCarreraCategoria } = req.query

  try {
    result = await CarreraCategoria.remove({
      where: {
        idCarreraCategoria
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
