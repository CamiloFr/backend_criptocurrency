"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autenticacionUsuario = void 0;

var _usuarios = _interopRequireDefault(require("../models/usuarios.models"));

var _expressValidator = require("express-validator");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// models
// validation express
// token
// encrypt
const autenticacionUsuario = async (req, res) => {
  let {
    nombreusuario,
    contraseña
  } = req.body;
  let errores = (0, _expressValidator.validationResult)(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array()
    });
  }

  let usuarioexiste = await _usuarios.default.findOne({
    where: {
      nombreusuario
    }
  });

  if (!usuarioexiste) {
    return res.status(400).json({
      mensaje: "Usuario no existe"
    });
  }

  if (_bcrypt.default.compareSync(contraseña, usuarioexiste.contraseña)) {
    let token = _jsonwebtoken.default.sign({
      idusuario: usuarioexiste.idusuario,
      nombreusuario: usuarioexiste.nombreusuario,
      pais: usuarioexiste.pais
    }, process.env.HASH, {
      expiresIn: "8h"
    });

    return res.status(200).json(token);
  }

  return res.status(400).json({
    mensaje: "Contraseña incorrecta"
  });
};

exports.autenticacionUsuario = autenticacionUsuario;