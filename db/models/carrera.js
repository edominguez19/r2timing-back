'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupCarreraModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('carrera', {
	
		idCarrera: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idCarrera'
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'nombre'
		},
		ciudad: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'ciudad'
		},
		fecha: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'fecha'
		},
		precio: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'precio'
		}
	
		}, {
		tableName: 'carrera',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
