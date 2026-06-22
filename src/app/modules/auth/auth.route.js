import { Router } from "express";
import { createLoginUser } from "./auth.controller.js";

const router = Router();

router.post("/login", createLoginUser);

export const AuthRoute = router;
