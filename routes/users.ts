import { Router } from "express";
import { getAllUsers, postUsuario } from "../controller/users";

const router = Router();

router.get("/", getAllUsers);
router.post("/", postUsuario);

export default router;
