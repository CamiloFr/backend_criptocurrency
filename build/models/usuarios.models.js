"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Usuarios = _database.sequelizeconfig.define("usuarios", {
  idusuario: {
    type: _sequelize.default.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombreusuario: {
    type: _sequelize.default.STRING,
    primaryKey: true
  },
  contraseña: {
    type: _sequelize.default.STRING
  },
  pais: {
    type: _sequelize.default.STRING
  }
}, {
  timestamps: false
});

var _default = Usuarios;
exports.default = _default;