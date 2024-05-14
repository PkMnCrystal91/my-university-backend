import { Router } from "express";
import { getAllBooks, postBook } from "../controller/books";

const router = Router();

router.get("/", getAllBooks);
router.post("/", postBook);

export default router;
