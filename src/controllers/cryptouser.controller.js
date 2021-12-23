import { validationResult } from "express-validator";
import Monedas from "../models/monedas.models";
import MonedasUsuarios from "../models/monedasusuario.models";
import Usuarios from "../models/usuarios.models";

export const consultarMonedas = async (req, res) => {
  let { pais } = req.usuario;
  try {
    let data = await Monedas.findAll({
      where: {
        pais,
      },
    });
    return res.json({
      mensaje: "Proceso completado",
      data,
    });
  } catch (error) {
    console.log(error, "consultar monedas");
    res.status(400).json({
      mensaje: "Hubo un error consultando las monedas",
    });
  }
};

export const consultarMonedasUsarios = async (req, res) => {
  let { id } = req.params;
  let { idusuario } = req.usuario;

  try {
    let usuario = Usuarios.findOne({
      where: {
        idusuario: idusuario,
      },
    });

    if (!usuario) {
      res.status(400).json({
        mensaje: "Usuario no existe",
      });
    }

    console.log(idusuario, "este es el usuario");

    let data = await MonedasUsuarios.findAll({
      where: {
        idusuario_monedas: idusuario,
      },
    });

    console.log(data, "estas son las monedas del usuario");

    if (data === null || data.length === 0) {
      return res.json({
        data: [],
      });
    }

    return res.json({
      mensaje: "Proceso completado",
      data: data,
    });
  } catch (error) {
    console.log(error, "consultar monedas usuario");
    res.status(400).json({
      mensaje: "Hubo un error consultando las monedas usuario",
    });
  }
};

export const crearMonedaUsuario = async (req, res) => {
  let { id } = req.params;
  let { simbolo, nombremoneda, tasacambio, pais, nombreusuario_monedas, idusuario_monedas } = req.body;

  let errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array(),
    });
  }

  try {
    console.log(parseInt(id), "id_usuario");
    let usuario = await Usuarios.findOne({
      where: {
        idusuario: parseInt(id),
      },
    });

    console.log(usuario, "este es el resultado del usuario");

    if (!usuario) {
      res.status(400).json({
        mensaje: "Usuario no existe",
      });
    }

    let otramoneda = await MonedasUsuarios.findOne({
      where: {
        simbolo,
        nombreusuario_monedas,
        pais: usuario.pais,
      },
    });

    console.log(otramoneda, "otra moneda");

    if (otramoneda) {
      return res.status(400).json({
        mensaje: "Moneda ya esta asociada",
      });
    }

    let data = await MonedasUsuarios.create({
      nombremoneda,
      simbolo,
      tasacambio,
      pais,
      nombreusuario_monedas,
      idusuario_monedas,
    });

    return res.json({
      mensaje: "Proceso completado",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error guardando la moneda del usuario",
    });
  }
};

export const editarMonedasUsuario = async (req, res) => {
  // let { id } = req.params;
  let { idusuario } = req.usuario;
  let { simbolo, nombremoneda, tasacambio, pais, nombreusuario_monedas, idusuario_monedas, simboloanterior } = req.body;

  let errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array(),
    });
  }

  try {
    let usuario = await Usuarios.findOne({
      where: {
        idusuario: parseInt(idusuario),
      },
    });

    console.log(usuario, "este es el resultado del usuario");

    if (!usuario) {
      res.status(400).json({
        mensaje: "Usuario no existe",
      });
    }

    let otramoneda = await MonedasUsuarios.findOne({
      where: {
        simbolo,
        idusuario_monedas,
      },
    });

    if (otramoneda) {
      return res.status(400).json({
        mensaje: "Moneda ya existe",
      });
    }

    let data = await MonedasUsuarios.update(
      {
        simbolo,
        nombremoneda,
        tasacambio,
        pais,
      },
      {
        where: {
          simbolo: simboloanterior,
          idusuario_monedas: idusuario,
        },
      }
    );

    return res.json({
      mensaje: "Proceso completado",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error editando la moneda del usuario",
    });
  }
};

export const eliminarMonedasUsuario = async (req, res) => {
  let { id } = req.params;

  let errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array(),
    });
  }

  let otramoneda = await MonedasUsuarios.findOne({
    where: {
      idmonedausuario: id,
    },
  });

  if (!otramoneda) {
    return res.status(400).json({
      mensaje: "Moneda no existe",
    });
  }

  try {
    let data = await MonedasUsuarios.destroy({
      where: {
        idmonedausuario: id,
      },
    });
    return res.json({
      mensaje: "Proceso completado",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error eliminando la moneda del usuario",
    });
  }
};
