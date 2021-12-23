"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminarMonedasUsuario = exports.editarMonedasUsuario = exports.crearMonedaUsuario = exports.consultarMonedasUsarios = exports.consultarMonedas = void 0;

var _expressValidator = require("express-validator");

var _monedas = _interopRequireDefault(require("../models/monedas.models"));

var _monedasusuario = _interopRequireDefault(require("../models/monedasusuario.models"));

var _usuarios = _interopRequireDefault(require("../models/usuarios.models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const consultarMonedas = async (req, res) => {
  try {
    let data = await _monedas.default.findAll();
    return res.json({
      mensaje: "Proceso completado",
      data
    });
  } catch (error) {
    console.log(error, "consultar monedas");
    res.status(400).json({
      mensaje: "Hubo un error consultando las monedas"
    });
  }
};

exports.consultarMonedas = consultarMonedas;

const consultarMonedasUsarios = async (req, res) => {
  let {
    id
  } = req.params;
  let {
    idusuario
  } = req.usuario;

  try {
    let usuario = _usuarios.default.findOne({
      where: {
        idusuario: idusuario
      }
    });

    if (!usuario) {
      res.status(400).json({
        mensaje: "Usuario no existe"
      });
    }

    console.log(idusuario, "este es el usuario");
    let data = await _monedasusuario.default.findAll({
      where: {
        idusuario_monedas: idusuario
      }
    });
    console.log(data, "estas son las monedas del usuario");

    if (data === null || data.length === 0) {
      return res.json({
        data: []
      });
    }

    return res.json({
      mensaje: "Proceso completado",
      data: data
    });
  } catch (error) {
    console.log(error, "consultar monedas usuario");
    res.status(400).json({
      mensaje: "Hubo un error consultando las monedas usuario"
    });
  }
};

exports.consultarMonedasUsarios = consultarMonedasUsarios;

const crearMonedaUsuario = async (req, res) => {
  let {
    id
  } = req.params;
  let {
    simbolo,
    nombremoneda,
    tasacambio,
    pais,
    nombreusuario_monedas,
    idusuario_monedas
  } = req.body;
  let errores = (0, _expressValidator.validationResult)(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array()
    });
  }

  try {
    console.log(parseInt(id), "id_usuario");
    let usuario = await _usuarios.default.findOne({
      where: {
        idusuario: parseInt(id)
      }
    });
    console.log(usuario, "este es el resultado del usuario");

    if (!usuario) {
      res.status(400).json({
        mensaje: "Usuario no existe"
      });
    }

    let otramoneda = await _monedasusuario.default.findOne({
      where: {
        simbolo,
        nombreusuario_monedas,
        pais: usuario.pais
      }
    });
    console.log(otramoneda, "otra moneda");

    if (otramoneda) {
      return res.status(400).json({
        mensaje: "Moneda ya esta asociada"
      });
    }

    let data = await _monedasusuario.default.create({
      nombremoneda,
      simbolo,
      tasacambio,
      pais,
      nombreusuario_monedas,
      idusuario_monedas
    });
    return res.json({
      mensaje: "Proceso completado",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error guardando la moneda del usuario"
    });
  }
};

exports.crearMonedaUsuario = crearMonedaUsuario;

const editarMonedasUsuario = async (req, res) => {
  // let { id } = req.params;
  let {
    idusuario
  } = req.usuario;
  let {
    simbolo,
    nombremoneda,
    tasacambio,
    pais,
    nombreusuario_monedas,
    idusuario_monedas,
    simboloanterior
  } = req.body;
  let errores = (0, _expressValidator.validationResult)(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array()
    });
  }

  try {
    let usuario = await _usuarios.default.findOne({
      where: {
        idusuario: parseInt(idusuario)
      }
    });
    console.log(usuario, "este es el resultado del usuario");

    if (!usuario) {
      res.status(400).json({
        mensaje: "Usuario no existe"
      });
    }

    let otramoneda = await _monedasusuario.default.findOne({
      where: {
        simbolo,
        idusuario_monedas
      }
    });

    if (otramoneda) {
      return res.status(400).json({
        mensaje: "Moneda ya existe"
      });
    }

    let data = await _monedasusuario.default.update({
      simbolo,
      nombremoneda,
      tasacambio,
      pais
    }, {
      where: {
        simbolo: simboloanterior,
        idusuario_monedas: idusuario
      }
    });
    return res.json({
      mensaje: "Proceso completado",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error editando la moneda del usuario"
    });
  }
};

exports.editarMonedasUsuario = editarMonedasUsuario;

const eliminarMonedasUsuario = async (req, res) => {
  let {
    id
  } = req.params;
  let errores = (0, _expressValidator.validationResult)(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array()
    });
  }

  let otramoneda = await _monedasusuario.default.findOne({
    where: {
      idmonedausuario: id
    }
  });

  if (!otramoneda) {
    return res.status(400).json({
      mensaje: "Moneda no existe"
    });
  }

  try {
    let data = await _monedasusuario.default.destroy({
      where: {
        idmonedausuario: id
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

exports.eliminarMonedasUsuario = eliminarMonedasUsuario;