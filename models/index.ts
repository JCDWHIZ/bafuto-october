import { sequelize } from "../config/db";
import { Ingredient } from "./Ingredients";
import { Recipie } from "./Recipie";
import { User } from "./User";

const models = {
  User,
  Recipie,
  Ingredient,
};

// Set up associations
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // Use { force: true } in development to drop and recreate tables
    console.log("All models synchronized successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};
