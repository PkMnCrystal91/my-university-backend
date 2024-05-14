import { Sequelize } from "sequelize";

const db = new Sequelize("test", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

export default db;
