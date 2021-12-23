import Jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const usuario = Jwt.verify(token, process.env.HASH);
      req.usuario = usuario;
      return next();
    } catch (error) {
      return res.status(400).json({
        mensaje: "Error token invalido",
      });
    }
  }

  return res.status(400).json({
    mensaje: "Error no hay token",
  });
}
