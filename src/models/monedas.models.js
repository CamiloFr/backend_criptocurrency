import Sequelize from "sequelize";
import { sequelizeconfig } from "../database/database";

const Monedas = sequelizeconfig.define(
  "monedas",
  {
    idmoneda: {
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
  },
  {
    timestamps: false,
  }
);

export default Monedas;
