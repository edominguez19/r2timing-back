'use strict'

const { separatorResult } = require('../../util')
const AES = require("crypto-js/aes");
const {SHA256} = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
const enc = require("crypto-js");
module.exports = function setupUsuario (UsuarioModel,RolModel)  {
    async function findAll (where) {
        return UserModel.findAll({
          attributes: [
            'id', 'document',
            'nickname', 'email', 'elearningUser', 'config', 'fullName'],
          include: [
            {
              model: RolModel, attributes: [
                'name',
                'permissions',
                'config'],
            },
          ], where,
        })
      }
    
      async function findUserByName (username,password) {
        return new Promise((resp, reject) => {
            UsuarioModel.findOne({
            attributes: [
              'idUsuario', 'username', 'password',
              'estado', 'Participante_idParticipante', 'Rol_idRol'],
            where: {
              username,
              password
            }, raw: true,
          }).then(async result => {
            if (result) {
              console.log(result)
              resp({ ... result })
            } else
              resp(null)
          }).catch(err => reject(err))
        })
    
      }
    
      async  function updateOrCreateByUsername(model) {
        return new Promise(async (resolve, reject) => {
            try {
                const instanceModel = await UsuarioModel.findOne(
                    { where: { username: model.username } })
        
                let result
                if (instanceModel) {
                    result = await UsuarioModel.update({
                      Rol_idRol: model.Rol_idRol, 
                      Participante_idParticipante: model.Participante_idParticipante,
                        username: model.username,
                        password: CryptoJS.SHA256(model.password).toString(enc.Hex).trim(),
                        estado: model.estado
                    }, { where: { idUsuario: instanceModel.idUsuario } })
                    result={mensaje:"actualización exitosa"}
                } else {
                    result = await UsuarioModel.create({
                      Rol_idRol: model.Rol_idRol, 
                        Participante_idParticipante: model.Participante_idParticipante,
                        username: model.username,
                        password:  CryptoJS.SHA256(model.password).toString(enc.Hex).trim(),
                        estado: model.estado
                       
                    })
                }
                resolve(result)
            } catch (e) {
                reject(e)
            }
        })
    }
  
    return {
        findAll,
        findUserByName,
        updateOrCreateByUsername,
    }
}
