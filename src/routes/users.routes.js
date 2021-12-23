import { Router } from "express";
import { crearUsuario, editarUsuario, eliminarUsuario, obtenerUsuarios } from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

// router

const router = Router();

/**
 * @swagger
 * /api/user/:
 *  get:
 *     summary: Obtiene todoos los usuarios
 *     responses:
 *       200:
 *         description: Estos son los usuarios
 */
router.get("/", authMiddleware, obtenerUsuarios);

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

router.post("/", crearUsuario);

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

router.put("/", authMiddleware, editarUsuario);

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

router.delete("/", authMiddleware, eliminarUsuario);

export default router;
