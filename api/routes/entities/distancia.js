'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, Distancia

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      Distancia = services.Distancia
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit,idDistancia,nombre,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Distancia.findAll({
      where: {
        idDistancia,nombre,
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
  const {  idDistancia,nombre, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Distancia.findOne({
      where: {
        idDistancia,nombre,
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
    result = await Distancia.findById(id)
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
    obj = await Distancia.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const {  idDistancia } = req.query
  
  try {
    result = await Distancia.remove({
      where: {
        idDistancia
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
