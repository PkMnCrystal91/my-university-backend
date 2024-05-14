import { DataTypes, Sequelize } from "sequelize";
import db from "../db/connection";
import BookReservation from "./bookReservation";

const Book = db.define("books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  publishedyear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Book;
