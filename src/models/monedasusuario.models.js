import Sequelize from "sequelize";
import { sequelizeconfig } from "../database/database";

const MonedasUsuarios = sequelizeconfig.define(
  "monedasusuarios",
  {
    idmonedausuario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    simbolo: {
      type: Sequelize.STRING,
    },
    nombremoneda: {
      type: Sequelize.STRING,
    },
    tasacambio: {
      type: Sequelize.FLOAT,
    },
    pais: {
      type: Sequelize.STRING,
    },
    nombreusuario_monedas: {
      type: Sequelize.STRING,
    },
    idusuario_monedas: {
      type: Sequelize.NUMBER,
    },
  },
  { timestamps: false }
);

export default MonedasUsuarios;
