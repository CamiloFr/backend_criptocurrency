// models
import Usuarios from "../models/usuarios.models";
// validation express
import { validationResult } from "express-validator";
// token
import Jwt from "jsonwebtoken";
// encrypt
import bcrypt from "bcrypt";

export const autenticacionUsuario = async (req, res) => {
  let { nombreusuario, contraseña } = req.body;

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
  if (!usuarioexiste) {
    return res.status(400).json({
      mensaje: "Usuario no existe",
    });
  }

  if (bcrypt.compareSync(contraseña, usuarioexiste.contraseña)) {
    let token = Jwt.sign(
      {
        idusuario: usuarioexiste.idusuario,
        nombreusuario: usuarioexiste.nombreusuario,
        pais: usuarioexiste.pais,
      },
      process.env.HASH,
      {
        expiresIn: "8h",
      }
    );
    return res.status(200).json(token);
  }

  return res.status(400).json({
    mensaje: "Contraseña incorrecta",
  });
};
