import { Request, Response } from "express";
import { z } from "zod";
import { AuthService } from "./auth.service";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthController {
  static async register(req: Request, res: Response) {
    const body = registerSchema.parse(req.body);
    const out = await AuthService.register(
      body.name,
      body.email,
      body.password
    );
    res.status(201).json(out);
  }
  static async login(req: Request, res: Response) {
    const body = loginSchema.parse(req.body);
    const out = await AuthService.login(body.email, body.password);
    res.json(out);
  }
}
