'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../../db')

const api = asyncify(express.Router())

let services, RolPermisos

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
      RolPermisos = services.RolPermisos
    } catch (e) {
      next(e)
    }
  }
  next()
})

api.get('/findAll', async (req, res, next) => {
  const {
    _page, _limit,  idRolPermiso, Rol_idRol, Permiso_idPermiso,
  } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await RolPermisos.findAll({
      where: {
        idRolPermiso, Rol_idRol, Permiso_idPermiso,
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
  const {idRolPermiso, Rol_idRol, Permiso_idPermiso, } = req.query
  let result = {
    count: 0,
    rows: [],
  }
  try {
    result = await RolPermisos.findOne({
      where: {
        idRolPermiso, Rol_idRol, Permiso_idPermiso,
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
    result = await RolPermisos.findById(id)
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
    obj = await RolPermisos.createOrUpdate(model)
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})


api.get('/remove', async (req, res, next) => {
  const {  idRolPermiso } = req.query
  
  try {
    result = await RolPermisos.remove({
      where: {
        idRolPermiso
      },
    })
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
