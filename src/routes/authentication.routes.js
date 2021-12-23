import { Router } from "express";
import { autenticacionUsuario } from "../controllers/authentication.controller";

// router
const router = Router();

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

router.post("/", autenticacionUsuario);

export default router;
