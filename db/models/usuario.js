'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupUsuarioModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('usuario', {
		idUsuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idUsuario'
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'username'
		},
	    password: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'password'
		},
		estado: {
			type: DataTypes.STRING(1),
			allowNull: false,
			field: 'estado'
		},
	
		Participante_idParticipante: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Participante_idParticipante'
		},
		Rol_idRol: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Rol_idRol'
		}

		}, {
		tableName: 'usuario',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
