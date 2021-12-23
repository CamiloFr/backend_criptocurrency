import { Router } from "express";
import {
  consultarMonedas,
  crearMonedaUsuario,
  editarMonedasUsuario,
  eliminarMonedasUsuario,
  consultarMonedasUsarios,
} from "../controllers/cryptouser.controller";
import authMiddleware from "../middleware/auth.middleware";

// router
const router = Router();

/**
 * @swagger
 * /api/cryptouser/:
 *  get:
 *    summary: Obtiene todas las monedas
 *    responses:
 *      200:
 *        description: Estas son las monedas
 */
router.get("/", consultarMonedas);

/**
 * @swagger
 * /api/cryptouser/{userId}:
 *  get:
 *    summary: Obtiene todas las monedas según el usuario
 *    parameters:
 *      - idusuario: userId
 *        in: path
 *        required: true
 *        description: Id del usuario
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Estas son las monedas por este usuario
 */
router.get("/:id", authMiddleware, consultarMonedasUsarios);

/**
 * @swagger
 * /api/cryptouser/{userId}:
 *  post:
 *    summary: Guarda las monedas segun el usuario
 *    parameters:
 *      - in: body
 *        name: moneda
 *        description: Datos de la moneda.
 *        schema:
 *          type: object
 *          required:
 *            - simbolo
 *          properties:
 *            simbolo:
 *              type: string
 *            nombre:
 *              type: string
 *            tasacambio:
 *              type: float
 *            pais:
 *              type: string
 *      - idusuario: userId
 *        in: path
 *        required: true
 *        description: Id del usuario
 *        schema:
 *          type: integer
 *    requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 simbolo:
 *                   type: string
 *                   description: Simbolo de la moneda.
 *                   example: BTC
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la moneda.
 *                   example: Bitcoin
 *                 tasacambio:
 *                   type: float
 *                   description: Valor de la moneda.
 *                   Example: 61169.02
 *                 pais:
 *                   type: string
 *                   description: País de la moneda.
 *                   pais: Colombia
 *              example:
 *                simbolo: BTC
 *                nombre: Bitcoin
 *                tasacambio: 61169.02
 *                pais: Colombia
 *    responses:
 *      200:
 *        description: Su moneda fue grabada
 */
router.post("/:id", authMiddleware, crearMonedaUsuario);

/**
 * @swagger
 * /api/cryptouser/{userId}:
 *  put:
 *    summary: Modifica una moneda segun el usuario.
 *    parameters:
 *      - in: body
 *        name: moneda
 *        description: Datos de la moneda.
 *        schema:
 *          type: object
 *          required:
 *            - simbolo
 *          properties:
 *            idmonedausuarios:
 *              type: integer
 *            simbolo:
 *              type: string
 *            nombre:
 *              type: string
 *            tasacambio:
 *              type: float
 *            pais:
 *              type: string
 *      - idusuario: userId
 *        in: path
 *        required: true
 *        description: Id del usuario
 *        schema:
 *          type: integer
 *    requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 idmonedausuarios:
 *                   type: integer
 *                   description: Id de la moneda.
 *                   example: 1
 *                 simbolo:
 *                   type: string
 *                   description: Simbolo de la moneda.
 *                   example: BTC
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la moneda.
 *                   example: Bitcoin
 *                 tasacambio:
 *                   type: float
 *                   description: Valor de la moneda.
 *                   Example: 61169.02
 *                 pais:
 *                   type: string
 *                   description: País de la moneda.
 *                   pais: Colombia
 *    responses:
 *      200:
 *        description: Su moneda fue modificada
 */
router.put("/:id", authMiddleware, editarMonedasUsuario);

/**
 * @swagger
 * /api/cryptouser/${userId}:
 *  delete:
 *    summary: Elimina una moneda segun el usuario
 *    parameters:
 *      - idusuario: userId
 *        in: path
 *        required: true
 *        description: Id del usuario
 *        schema:
 *          type: integer
 *      - in: body
 *        name: moneda
 *        description: Datos de la moneda.
 *        schema:
 *          type: object
 *          required:
 *            - idmodenasusuario
 *          properties:
 *            idmonedasusuario:
 *              type: integer
 *    requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 idmonedausuarios:
 *                   type: integer
 *                   description: Id de la moneda.
 *                   example: 1
 *    responses:
 *      200:
 *        description: Su moneda fue eliminada
 */
router.delete("/:id", authMiddleware, eliminarMonedasUsuario);

export default router;
