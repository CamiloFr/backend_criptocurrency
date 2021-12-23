import express, { json } from "express";
// import routes
import cryptoRoutes from "./routes/criptouser.routes";
import userRoutes from "./routes/users.routes";
import authenticationRoutes from "./routes/authentication.routes";
// path
import * as path from "path";
// swagger
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// cors
import cors from "cors";
// express server
const app = express();
app.use(cors());
app.use(json());

// swagger
const swaggerOption = {
  swaggerDefinition: {
    info: {
      title: "Crypto API",
      description: "Informacion de Crypto API",
      contact: {
        name: "Camilo Franco",
      },
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.routes.js")}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app funcionando
app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

// routes
app.use("/api/cryptouser", cryptoRoutes);
app.use("/api/user", userRoutes);
app.use("/api/autenticacion", authenticationRoutes);

export default app;