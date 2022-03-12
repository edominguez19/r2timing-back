'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupPermisosModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('permiso', {
		idPermiso: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idPermiso'
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
		}
	
		}, {
		tableName: 'permiso',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
