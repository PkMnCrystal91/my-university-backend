import { Router } from "express";
import { getAllUsers, postUsuario, loginUser } from "../controller/users";

const router = Router();

router.get("/", getAllUsers);
router.post("/", postUsuario);
router.post("/login", loginUser);

export default router;
