import jwt from "jsonwebtoken";
import { config } from "../config/env";

export function signJwt(payload: object) {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN as any,
  });
}
export function verifyJwt<T>(token: string): T {
  return jwt.verify(token, config.JWT_SECRET) as T;
}
