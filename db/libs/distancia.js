'use strict'
const moment = require('moment')
const { Op } = require('sequelize')
const { map } = require('lodash')

module.exports = function setupDistancia (DistanciaModel) {

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
      DistanciaModel.findAndCountAll({
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
      DistanciaModel.findAll({
        where,
        raw: true,
      }).then(result => {
        resp(result)
      }).catch(err => reject(err))
    })
  }

  async function findById (id) {
    return new Promise((resp, reject) => {
      DistanciaModel.findOne({
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
      DistanciaModel.findOne({
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
      DistanciaModel.remove({
        where: whereQuery,
        raw: true,
      }).then(result => {
        resp(result)
      }).catch(err => reject(err))
    })
  }


  

  
  async function createOrUpdate (model) {
    return new Promise((resp, reject) => {
      DistanciaModel.findOne({
        where: {
          nombre: model.nombre
               },
      }).then(instanceModel => {
        if (instanceModel) {
         
          DistanciaModel.update(model, {
            where: {
              idDistancia: instanceModel.idDistancia,
            },
          }).
            then(result => resp({ ...instanceModel, ...model })).
            catch(err => reject(err))
        } else {
          
          DistanciaModel.create(model).
            then(result => resp(result)).
            catch(err => reject(err))
        }
      }).catch(err => reject(err))
    })
  }

  return { findAll, getList, findById, findOne, createOrUpdate }
}
