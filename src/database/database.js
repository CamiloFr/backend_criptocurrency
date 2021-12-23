import sequelize from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

// NOMBRE DE BASE DE DATOS CRYPTO

export const sequelizeconfig = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
