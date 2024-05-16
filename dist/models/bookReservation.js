"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const users_1 = __importDefault(require("./users"));
const books_1 = __importDefault(require("./books"));
const BookReservation = connection_1.default.define("bookreservations", {
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: users_1.default,
            key: "id",
        },
    },
    book_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: books_1.default,
            key: "id",
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
BookReservation.belongsTo(books_1.default, { foreignKey: "book_id" });
exports.default = BookReservation;
//# sourceMappingURL=bookReservation.js.map