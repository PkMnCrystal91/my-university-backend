import { Router } from "express";
import {
  getAllReservations,
  getReservationsByUser,
  postReservation,
  returnedBook,
} from "../controller/bookreservations";

const router = Router();

router.get("/", getAllReservations);
router.get("/:id", getReservationsByUser);
router.post("/", postReservation);
router.delete("/:id", returnedBook);

export default router;
