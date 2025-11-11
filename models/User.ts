import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import bcrypt from "bcrypt";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    username: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
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
    },
    // subscription
  },
  {
    timestamps: true,
  }
);
//  {
//     timestamps: true,
//     hooks: {
//       beforeCreate: async (user: any) => {
//         if (user.password) {
//           const hashed = await bcrypt.hash(user.password, 10);
//           user.setDataValue("password", hashed);
//         }
//       },
//       beforeUpdate: async (user: any) => {
//         if (typeof user.changed === "function" && user.changed('password')) {
//           const hashed = await bcrypt.hash(user.password, 10);
//           user.setDataValue("password", hashed);
//         }
//       },
//     },
//   }
