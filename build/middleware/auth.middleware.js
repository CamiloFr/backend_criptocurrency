"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(req, res, next) {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const usuario = _jsonwebtoken.default.verify(token, process.env.HASH);

      req.usuario = usuario;
      return next();
    } catch (error) {
      return res.status(400).json({
        mensaje: "Error token invalido"
      });
    }
  }

  return res.status(400).json({
    mensaje: "Error no hay token"
  });
}