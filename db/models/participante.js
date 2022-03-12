'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')


module.exports = function setupParticipanteModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('participante', {
		idParticipante: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idParticipante'
		},
		ci: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'ci'
		},
	    apellidos: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'apellidos'
		},
		nombres: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'nombres'
		},
	
		fechaNacimiento: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'fechaNacimiento'
		},
		ciudad: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ciudad'
		},
		email: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'email'
		},
		telefono: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'telefono'
		}

		}, {
		tableName: 'participante',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
