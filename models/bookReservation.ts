import { DataTypes } from "sequelize";
import db from "../db/connection";

import User from "./users";
import Book from "./books";

const BookReservation = db.define("bookreservations", {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

BookReservation.belongsTo(Book, { foreignKey: "book_id" });

export default BookReservation;
