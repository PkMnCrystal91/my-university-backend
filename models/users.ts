import { DataTypes, Sequelize } from "sequelize";
import db from "../db/connection";

import BookReservation from "./bookReservation";

const User = db.define("users", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(BookReservation, { foreignKey: "user_id" });

BookReservation.belongsTo(User, { foreignKey: "user_id" });

export default User;
