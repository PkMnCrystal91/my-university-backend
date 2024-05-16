"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controller/users");
const router = (0, express_1.Router)();
router.get("/", users_1.getAllUsers);
router.post("/", users_1.postUsuario);
router.post("/login", users_1.loginUser);
exports.default = router;
//# sourceMappingURL=users.js.map