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
exports.postUsuario = exports.loginUser = exports.getAllUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const bookReservation_1 = __importDefault(require("../models/bookReservation"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_1.default.findAll({
        include: [
            {
                model: bookReservation_1.default,
                attributes: ["id", "book_id", "quantity"], // select the fields you want to include
            },
        ],
    });
    res.json(users);
});
exports.getAllUsers = getAllUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const logedUser = yield users_1.default.findAll({
        where: {
            email: body.email,
            password: body.password,
        },
    });
    if (logedUser.length === 0) {
        return res.status(400).json({
            msg: "Incorrect email/password ",
        });
    }
    res.json(logedUser);
});
exports.loginUser = loginUser;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield users_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: "Ya existe un usuario con el email " + body.email,
            });
        }
        const usuario = yield users_1.default.create(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
});
exports.postUsuario = postUsuario;
//# sourceMappingURL=users.js.map