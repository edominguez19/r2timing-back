'use strict'
const moment = require('moment')
const { Op } = require('sequelize')
const { map } = require('lodash')

module.exports = function setupUsuario (UsuarioModel) {

  async function findAll ({ where, page, pageSize }) {
    return new Promise((resp, reject) => {
      let whereQuery = {}
      const offset = pageSize * page
      const limit = pageSize
      map(where, (value, key) => {
        if (value && (key === 'id')) {
          whereQuery[key] = { [Op.eq]: value }
        } else if (value) {
          whereQuery[key] = { [Op.like]: `${value}%` }
        }
      })
      UsuarioModel.findAndCountAll({
        where: { ...whereQuery },
        offset,
        limit,
        raw: true,
      }).then(result => {
        resp(result)
      }).catch(err => reject(err))
    })
  }

  async function getList ({ where }) {
    return new Promise((resp, reject) => {
      UsuarioModel.findAll({
        where,
        raw: true,
      }).then(result => {
        resp(result)
      }).catch(err => reject(err))
    })
  }

  async function findById (id) {
    return new Promise((resp, reject) => {
      UsuarioModel.findOne({
        where: { id: id },
        raw: true,
      }).then(result => {
        resp(result)
      }).catch(err => reject(err))
    })
  }

  async function findOne ({ where }) {
    return new Promise((resp, reject) => {
      let whereQuery = {}
      map(where, (value, key) => {
        if (value) {
          whereQuery[key] = { [Op.eq]: value }
        }
      })
      UsuarioModel.findOne({
        where: whereQuery,
        raw: true,
      }).then(result => {
        resp(result)
      }).catch(err => reject(err))
    })
  }

  async function remove ({ where }) {
    return new Promise((resp, reject) => {
      let whereQuery = {}
      map(where, (value, key) => {
        if (value) {
          whereQuery[key] = { [Op.eq]: value }
        }
      })
      UsuarioModel.remove({
        where: whereQuery,
        raw: true,
      }).then(result => {
        resp(result)
      }).catch(err => reject(err))
    })
  }


  

  
  async function createOrUpdate (model) {
    return new Promise((resp, reject) => {
      UsuarioModel.findOne({
        where: {
          username: model.username
               },
      }).then(instanceModel => {
        if (instanceModel) {
         
          UsuarioModel.update(model, {
            where: {
              idUsuario: instanceModel.idUsuario,
            },
          }).
            then(result => resp({ ...instanceModel, ...model })).
            catch(err => reject(err))
        } else {
          
          UsuarioModel.create(model).
            then(result => resp(result)).
            catch(err => reject(err))
        }
      }).catch(err => reject(err))
    })
  }

  return { findAll, getList, findById, findOne, createOrUpdate }
}
