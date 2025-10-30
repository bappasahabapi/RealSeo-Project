import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { AuthController } from "./auth.controller";

const router = Router();
router.post("/register", asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));
export default router;
