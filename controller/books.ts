import { Request, Response } from "express";

import Book from "../models/books";

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll();

  res.json(books);
};

export const postBook = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const bookExist = await Book.findOne({
      where: {
        title: body.title,
      },
    });

    if (bookExist) {
      return res.status(400).json({
        msg: "Ya existe el libro con el titulo: " + body.title,
      });
    }

    const book = await Book.create(body);

    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
