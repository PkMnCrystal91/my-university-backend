"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("test", "postgres", "root", {
    host: "localhost",
    dialect: "postgres",
    define: {
        timestamps: false,
    },
});
exports.default = db;
//# sourceMappingURL=connection.js.map