import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface IngredientAttributes {
  id: string;
  name?: string;
  imageUrl: string;
  imageBase64: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type IngredientCreationAttributes = Optional<
  IngredientAttributes,
  "id" | "createdAt" | "name" | "updatedAt"
>;

export class Ingredient
  extends Model<IngredientAttributes, IngredientCreationAttributes>
  implements IngredientAttributes
{
  public id!: string;
  public name?: string;
  public imageUrl!: string;
  public userId!: string;
  public imageBase64!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(model: any) {}
}

// Initialize model
Ingredient.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageBase64: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Ingredient",
    tableName: "Ingredients",
    timestamps: true,
  }
);
