'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupRolModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('rol', {
		idRol: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idRol'
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'nombre'
		},
	    descripcion: {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'descripcion'
		},
		

		}, {
		tableName: 'rol',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
