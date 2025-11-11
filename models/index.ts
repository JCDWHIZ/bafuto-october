import { sequelize } from "../config/db";

export const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // Use { force: true } in development to drop and recreate tables
    console.log("All models synchronized successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};
