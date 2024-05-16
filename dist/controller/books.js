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
exports.postBook = exports.getAllBooks = void 0;
const querystring = require("querystring");
const books_1 = __importDefault(require("../models/books"));
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = querystring.parse(req.url.split("?")[1]);
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || 4;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const books = yield books_1.default.findAll();
        const paginatedBooks = books.slice(startIndex, endIndex);
        res.json({
            page,
            limit,
            totalItems: books.length,
            totalPages: Math.ceil(books.length / limit),
            data: paginatedBooks,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
});
exports.getAllBooks = getAllBooks;
const postBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const bookExist = yield books_1.default.findOne({
            where: {
                title: body.title,
            },
        });
        if (bookExist) {
            return res.status(400).json({
                msg: "Ya existe el libro con el titulo: " + body.title,
            });
        }
        const book = yield books_1.default.create(body);
        res.json(book);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.postBook = postBook;
//# sourceMappingURL=books.js.map