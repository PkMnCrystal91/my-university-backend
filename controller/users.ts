import { Request, Response } from "express";

import User from "../models/users";
import BookReservation from "../models/bookReservation";
import Book from "../models/books";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: [
      {
        model: BookReservation,
        attributes: ["id", "book_id", "quantity"], // select the fields you want to include
      },
    ],
  });

  res.json(users);
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeEmail = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: "Ya existe un usuario con el email " + body.email,
      });
    }

    const usuario = await User.create(body);

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
