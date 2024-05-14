import express, { Application } from "express";
import cors from "cors";

import usersRouter from "../routes/users";
import booksRouter from "../routes/books";
import bookReservations from "../routes/bookreservations";

import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
    books: "/api/books",
    reservations: "/api/reservations",
  };
  constructor() {
    this.app = express();
    this.port = "8000";

    this.dbConnection();
    this.middelwares();

    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middelwares() {
    // CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());

    // Carpeta publica
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, usersRouter);
    this.app.use(this.apiPaths.books, booksRouter);
    this.app.use(this.apiPaths.reservations, bookReservations);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server runing on port " + this.port);
    });
  }
}

export default Server;
