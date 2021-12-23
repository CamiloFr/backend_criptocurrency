"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MonedasUsuarios = _database.sequelizeconfig.define("monedasusuarios", {
  idmonedausuario: {
    type: _sequelize.default.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  simbolo: {
    type: _sequelize.default.STRING
  },
  nombremoneda: {
    type: _sequelize.default.STRING
  },
  tasacambio: {
    type: _sequelize.default.FLOAT
  },
  pais: {
    type: _sequelize.default.STRING
  },
  nombreusuario_monedas: {
    type: _sequelize.default.STRING
  },
  idusuario_monedas: {
    type: _sequelize.default.NUMBER
  }
}, {
  timestamps: false
});

var _default = MonedasUsuarios;
exports.default = _default;