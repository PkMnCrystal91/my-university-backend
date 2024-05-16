"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Book = connection_1.default.define("books", {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    publishedyear: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
});
exports.default = Book;
//# sourceMappingURL=books.js.map