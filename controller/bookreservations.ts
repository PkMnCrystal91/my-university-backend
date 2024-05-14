import { Request, Response } from "express";
import { Op } from "sequelize";

import User from "../models/users";
import Book from "../models/books";
import BookReservation from "../models/bookReservation";

export const getAllReservations = async (req: Request, res: Response) => {
  const reservations = await BookReservation.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstname", "lastname", "email"], // select the fields you want to include
      },
      {
        model: Book,
        attributes: ["id", "title", "author"], // select the fields you want to include
      },
    ],
  });

  res.json(reservations);
};

export const getReservationsByUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reservations = await BookReservation.findAll({
    where: {
      user_id: id,
    },
    include: [
      {
        model: Book,
        attributes: ["id", "title", "author"],
      },
    ],
  });

  res.json(reservations);
};

export const postReservation = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const book = await Book.findOne({
      where: {
        id: body.book_id,
      },
    });

    const noInStock = await Book.findAll({
      where: {
        id: body.book_id,
        stock: {
          [Op.gte]: body.quantity,
        },
      },
    });

    const user = await User.findOne({
      where: {
        id: body.user_id,
      },
    });

    if (noInStock.length === 0) {
      return res.status(400).json({
        msg: `No ${body.quantity} aviable in stock`,
      });
    }

    if (user === null) {
      return res.status(400).json({
        msg: "User game does not exist with id: " + body.user_id,
      });
    }

    if (book === null) {
      return res.status(400).json({
        msg: "Book does not exist with id: " + body.book_id,
      });
    }

    const bookRsrv = await BookReservation.create(body);

    await Book.decrement(
      { stock: body.quantity },
      {
        where: {
          id: body.book_id,
        },
      }
    );

    const updateBook = await Book.findByPk(body.book_id);

    res.status(200).json({
      msg: "Book reserved!",
      bookRsrv,
      updateBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const returnedBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const returnedBook = await BookReservation.findByPk(id);

    if (returnedBook === null) {
      return res.status(400).json({
        msg: "The user has returned book(s)",
      });
    }

    console.log(returnedBook?.dataValues.quantity);

    await Book.increment(
      { stock: returnedBook?.dataValues.quantity },
      {
        where: {
          id: returnedBook?.dataValues.book_id,
        },
      }
    );

    await returnedBook.destroy();

    res.status(200).json({
      msg: "Book Returned",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
