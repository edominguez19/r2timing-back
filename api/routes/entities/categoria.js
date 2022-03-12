'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, Categoria

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      Categoria = services.Categoria
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit,  idCategoria, nombre, descripcion,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Categoria.findAll({
      where: {
        idCategoria, nombre, descripcion,
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
  const {  idCategoria, nombre, descripcion, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await Categoria.findOne({
      where: {
        idCategoria, nombre, descripcion,
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
    result = await Categoria.findById(id)
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.post('/createOrUpdate', async (req, res, next) => {
  const model = req.body
  
  let obj = null
  try {
    obj = await Categoria.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const {  idCategoria } = req.query
  
  try {
    result = await Categoria.remove({
      where: {
        idCategoria
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
