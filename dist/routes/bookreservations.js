"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookreservations_1 = require("../controller/bookreservations");
const router = (0, express_1.Router)();
router.get("/", bookreservations_1.getAllReservations);
router.get("/:id", bookreservations_1.getReservationsByUser);
router.post("/", bookreservations_1.postReservation);
router.delete("/:id", bookreservations_1.returnedBook);
exports.default = router;
//# sourceMappingURL=bookreservations.js.map