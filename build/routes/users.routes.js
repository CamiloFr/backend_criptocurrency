"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// router
const router = (0, _express.Router)();
/**
 * @swagger
 * /api/user/:
 *  get:
 *     summary: Obtiene todoos los usuarios
 *     responses:
 *       200:
 *         description: Estos son los usuarios
 */

router.get("/", _auth.default, _user.obtenerUsuarios);
/**
 * @swagger
 * /api/user/:
 *  post:
 *    summary: Guarda un usuario
 *    parameters:
 *      - in: body
 *        name: data
 *        description: Datos del usuario.
 *        schema:
 *          type: object
 *          required:
 *            - nombreusuario
 *              contraseña
 *              pais
 *          properties:
 *              nombreusuario:
 *                type: string
 *                example: user
 *              contraseña:
 *                type: string
 *                example: contraseñasegura1
 *              pais:
 *                type: string
 *                example: Colombia
 */

router.post("/", _user.crearUsuario);
/**
 * @swagger
 * /api/user/${useId}:
 *  put:
 *    summary: Modifica un usuario
 *    parameters:
 *      - in: body
 *        name: data
 *        description: Datos del usuario.
 *        schema:
 *          type: object
 *          required:
 *            - nombreusuario
 *              contraseña
 *              pais
 *          properties:
 *              nombreusuario:
 *                type: string
 *                example: user
 *              contraseña:
 *                type: string
 *                example: contraseñasegura1
 *              pais:
 *                type: string
 *                example: Colombia
 *      - idusuario: userId
 *        in: path
 *        required: true
 *        description: Id del usuario
 *        schema:
 *          type: integer
 */

router.put("/", _auth.default, _user.editarUsuario);
/**
 * @swagger
 * /api/user/${useId}:
 *  delete:
 *    summary: Elimina un usuario
 *    parameters:
 *      - idusuario: userId
 *        in: path
 *        required: true
 *        description: Id del usuario
 *        schema:
 *          type: integer
 */

router.delete("/", _auth.default, _user.eliminarUsuario);
var _default = router;
exports.default = _default;