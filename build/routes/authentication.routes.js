"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authentication = require("../controllers/authentication.controller");

// router
const router = (0, _express.Router)();
/**
 * @swagger
 * /api/authentication/:
 *  post:
 *    summary: Autenticar un usuario
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: Datos del usuario
 *        schema:
 *          type: object
 *          required:
 *            - nombreusuario
 *              contraseña
 *          properties:
 *            nombreusuario:
 *              type: string
 *            contraseña:
 *              type: string
 *    reponses:
 *      200:
 *        description: Usuario autenticado
 */

router.post("/", _authentication.autenticacionUsuario);
var _default = router;
exports.default = _default;