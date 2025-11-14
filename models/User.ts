import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import bcrypt from "bcrypt";
import { models } from "../types/user";

// export const User = sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },

//     username: {
//       type: DataTypes.STRING,
//     },

//     password: {
//       type: DataTypes.STRING,
//       set(value: string) {
//         const hashed = bcrypt.hashSync(value, 10);
//         this.setDataValue("password", hashed);
//       },
//     },

//     profilePic: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     // subscription
//   },
//   {
//     timestamps: true,
//   }
// );

interface UserAttributes {
  id: string;
  username: string;
  password: string;
  profilePic?: string | null;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when creating a new user
type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "profilePic" | "createdAt" | "updatedAt"
>;

// Extend Sequelize’s Model
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public username!: string;
  public password!: string;
  public profilePic!: string | null;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: models) {
    this.hasMany(models.Recipie, {
      as: "UserRecipies",
      foreignKey: "createdBy",
    });
  }
}

// Initialize model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        const hashed = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hashed);
      },
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize, // passing the connection instance
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);
