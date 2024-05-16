"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnedBook = exports.postReservation = exports.getReservationsByUser = exports.getAllReservations = void 0;
const sequelize_1 = require("sequelize");
const users_1 = __importDefault(require("../models/users"));
const books_1 = __importDefault(require("../models/books"));
const bookReservation_1 = __importDefault(require("../models/bookReservation"));
const getAllReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservations = yield bookReservation_1.default.findAll({
        include: [
            {
                model: users_1.default,
                attributes: ["id", "firstname", "lastname", "email"], // select the fields you want to include
            },
            {
                model: books_1.default,
                attributes: ["id", "title", "author"], // select the fields you want to include
            },
        ],
    });
    res.json(reservations);
});
exports.getAllReservations = getAllReservations;
const getReservationsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reservations = yield bookReservation_1.default.findAll({
        where: {
            user_id: id,
        },
        include: [
            {
                model: books_1.default,
                attributes: ["id", "title", "author"],
            },
        ],
    });
    res.json(reservations);
});
exports.getReservationsByUser = getReservationsByUser;
const postReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const book = yield books_1.default.findOne({
            where: {
                id: body.book_id,
            },
        });
        const noInStock = yield books_1.default.findAll({
            where: {
                id: body.book_id,
                stock: {
                    [sequelize_1.Op.gte]: body.quantity,
                },
            },
        });
        const user = yield users_1.default.findOne({
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
        const bookRsrv = yield bookReservation_1.default.create(body);
        yield books_1.default.decrement({ stock: body.quantity }, {
            where: {
                id: body.book_id,
            },
        });
        const updateBook = yield books_1.default.findByPk(body.book_id);
        res.status(200).json({
            msg: "Book reserved!",
            bookRsrv,
            updateBook,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.postReservation = postReservation;
const returnedBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const returnedBook = yield bookReservation_1.default.findByPk(id);
        if (returnedBook === null) {
            return res.status(400).json({
                msg: "The user has returned book(s)",
            });
        }
        console.log(returnedBook === null || returnedBook === void 0 ? void 0 : returnedBook.dataValues.quantity);
        yield books_1.default.increment({ stock: returnedBook === null || returnedBook === void 0 ? void 0 : returnedBook.dataValues.quantity }, {
            where: {
                id: returnedBook === null || returnedBook === void 0 ? void 0 : returnedBook.dataValues.book_id,
            },
        });
        yield returnedBook.destroy();
        res.status(200).json({
            msg: "Book Returned",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.returnedBook = returnedBook;
//# sourceMappingURL=bookreservations.js.map