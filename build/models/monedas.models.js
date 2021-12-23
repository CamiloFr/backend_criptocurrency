"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Monedas = _database.sequelizeconfig.define("monedas", {
  idmoneda: {
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
  }
}, {
  timestamps: false
});

var _default = Monedas;
exports.default = _default;