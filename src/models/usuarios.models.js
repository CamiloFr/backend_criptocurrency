import Sequelize from "sequelize";
import { sequelizeconfig } from "../database/database";

const Usuarios = sequelizeconfig.define(
  "usuarios",
  {
    idusuario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreusuario: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    contraseña: {
      type: Sequelize.STRING,
    },
    pais: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Usuarios;
