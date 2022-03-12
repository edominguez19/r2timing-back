'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../libs/db')

module.exports = function setupRolPermisosModel (config) {

	const sequelize = setupDatabase(config)
	return sequelize.define('rolpermiso', {
		idRolPermiso: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'idRolPermiso'
		},
		Rol_idRol: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'Rol_idRol'
		},
	    Permiso_idPermiso: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'Permiso_idPermiso'
		}
		}, {
		tableName: 'rolpermiso',
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	});
};
