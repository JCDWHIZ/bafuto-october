import { Sequelize } from "sequelize";
require("dotenv").config();

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USERNAME as string,
  process.env.DATABASE_PASSWORD,
  {
    port: Number(process.env.DATABASE_PORT) || 5432,
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "postgres",
    // logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
