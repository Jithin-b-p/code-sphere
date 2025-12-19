import { Router } from "express";
import { login, register } from "./auth.controller";
import { AuthRequest, requireAdmin, requireAuth } from "./auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", requireAuth, (req: AuthRequest, res) => {
    res.json({user: req.user});
})

export default router;