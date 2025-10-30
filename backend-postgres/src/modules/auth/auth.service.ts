import bcrypt from "bcrypt";
import { signJwt } from "../../utils/jwt";
import { UserRepo } from "./user.repo";

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const exists = await UserRepo.findByEmail(email);
    if (exists) throw new Error("Email already registered");
    const hash = await bcrypt.hash(password, 10);
    const user = await UserRepo.create({ name, email, password: hash });
    return { id: user.id, email: user.email };
  },

  
  async login(email: string, password: string) {
    const user = await UserRepo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Invalid credentials");
    const token = signJwt({ userId: user.id, email: user.email });
    return { token };
  },
};
