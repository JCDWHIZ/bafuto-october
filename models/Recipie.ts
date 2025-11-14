import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface RecipieAttributes {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type RecipieCreationAttributes = Optional<
  RecipieAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class Recipie
  extends Model<RecipieAttributes, RecipieCreationAttributes>
  implements RecipieAttributes
{
  public title!: string;
  public ingredients!: string;
  public description!: string;
  public createdBy!: string;
  public instructions!: string;
  public prepTime!: number;
  public cookTime!: number;
  public servings!: number;
  public tags!: string[];
  public id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(model: any) {}
}

// Initialize model
Recipie.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    prepTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cookTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: "id",
        model: "User",
      },
    },
  },
  {
    sequelize,
    modelName: "Recipie",
    tableName: "Recipies",
    timestamps: true,
  }
);
