import { Request, Response } from "express";
const querystring = require("querystring");

import Book from "../models/books";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const params = querystring.parse(req.url.split("?")[1]);
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const books = await Book.findAll();
    const paginatedBooks = books.slice(startIndex, endIndex);

    res.json({
      page,
      limit,
      totalItems: books.length,
      totalPages: Math.ceil(books.length / limit),
      data: paginatedBooks,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
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
