// models
import Usuarios from "../models/usuarios.models";
// validation express
import { validationResult } from "express-validator";
// token
import Jwt from "jsonwebtoken";
// encrypt
import bcrypt from "bcrypt";

export const obtenerUsuarios = async (req, res) => {
  try {
    let data = await Usuarios.findAll();
    res.status(200).json({
      mensaje: "Proscceso completado",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error guardando usuarios",
    });
  }
};

export const crearUsuario = async (req, res) => {
  console.log(req.body);
  let { nombreusuario, contraseña, pais } = req.body;

  console.log(nombreusuario, contraseña, pais);

  let errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array(),
    });
  }

  let usuarioexiste = await Usuarios.findOne({
    where: {
      nombreusuario,
    },
  });

  if (usuarioexiste) {
    return res.status(400).json({
      mensaje: "Usuario ya existe",
    });
  }

  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(contraseña, salt);

  try {
    Usuarios.create({
      nombreusuario: nombreusuario,
      contraseña: password,
      pais: pais,
    });
    res.status(200).json({
      mensaje: "Usuario creado",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error guardando usuarios",
    });
  }
};

export const editarUsuario = async (req, res) => {
  let { id } = req.params;
  let { nombreusuario, contraseña, pais } = req.body;

  let errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: errores.array(),
    });
  }

  try {
    let usuario = Usuarios.find({
      where: {
        idisuario: id,
      },
    });

    console.log(usuario, "este es el resultado del usuario");

    if (!usuario) {
      res.status(400).json({
        mensaje: "Usuario no existe",
      });
    }

    let data = await Usuarios.update(
      {
        contraseña,
        pais,
      },
      {
        where: {
          idusuario: id,
        },
      }
    );

    res.status(200).json({
      mensaje: "Proscceso completado",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Hubo un error editando la moneda del usuario",
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  let { id } = req.params;

  try {
    let data = await Usuarios.destroy({
      where: {
        idusuario: id,
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
