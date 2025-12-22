import { Router } from "express";
import { requireAdmin, requireAuth } from "../auth/auth.middleware";
import { createProblem, getProblem, listProblems } from "./problems.controller";

const router = Router();

router.get("/", listProblems);
router.get("/:slug", getProblem);
router.post("/", requireAuth, requireAdmin, createProblem);

export default router;