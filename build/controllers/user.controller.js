"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerUsuarios = exports.eliminarUsuario = exports.editarUsuario = exports.crearUsuario = void 0;

var _usuarios = _interopRequireDefault(require("../models/usuarios.models"));

var _expressValidator = require("express-validator");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// models
// validation express
// token
// encrypt
const obtenerUsuarios = async (req, res) => {
  try {
    let data = await _usuarios.default.findAll();
    res.status(200).json({
      mensaje: "Proscceso completado",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error guardando usuarios"
    });
  }
};

exports.obtenerUsuarios = obtenerUsuarios;

const crearUsuario = async (req, res) => {
  console.log(req.body);
  let {
    nombreusuario,
    contraseña,
    pais
  } = req.body;
  console.log(nombreusuario, contraseña, pais);
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

  if (usuarioexiste) {
    return res.status(400).json({
      mensaje: "Usuario ya existe"
    });
  }

  const salt = await _bcrypt.default.genSalt(10);
  let password = await _bcrypt.default.hash(contraseña, salt);

  try {
    _usuarios.default.create({
      nombreusuario: nombreusuario,
      contraseña: password,
      pais: pais
    });

    res.status(200).json({
      mensaje: "Usuario creado",
      data: req.body
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error guardando usuarios"
    });
  }
};

exports.crearUsuario = crearUsuario;

const editarUsuario = async (req, res) => {
  let {
    id
  } = req.params;
  let {
    nombreusuario,
    contraseña,
    pais
  } = req.body;
  let errores = (0, _expressValidator.validationResult)(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array()
    });
  }

  try {
    let usuario = _usuarios.default.find({
      where: {
        idisuario: id
      }
    });

    console.log(usuario, "este es el resultado del usuario");

    if (!usuario) {
      res.status(400).json({
        mensaje: "Usuario no existe"
      });
    }

    let data = await _usuarios.default.update({
      contraseña,
      pais
    }, {
      where: {
        idusuario: id
      }
    });
    res.status(200).json({
      mensaje: "Proscceso completado",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error editando la moneda del usuario"
    });
  }
};

exports.editarUsuario = editarUsuario;

const eliminarUsuario = async (req, res) => {
  let {
    id
  } = req.params;

  try {
    let data = await _usuarios.default.destroy({
      where: {
        idusuario: id
      }
    });
    return res.json({
      mensaje: "Proceso completado",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error eliminando la moneda del usuario"
    });
  }
};

exports.eliminarUsuario = eliminarUsuario;