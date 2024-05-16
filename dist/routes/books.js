"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_1 = require("../controller/books");
const router = (0, express_1.Router)();
router.get("/", books_1.getAllBooks);
router.post("/", books_1.postBook);
exports.default = router;
//# sourceMappingURL=books.js.map