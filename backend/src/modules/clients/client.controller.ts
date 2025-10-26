import { Request, Response } from "express";
import { z } from "zod";
import { ClientService } from "./client.service";

const createSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  address: z.string(),
  dob: z.string(),
  cell: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
});

export class ClientController {
  static async list(req: Request, res: Response) {
    const { search, sort, order, page = "1", pageSize = "10" } = req.query;
    const result = await ClientService.list({
      search: search as string | undefined,
      sort: (sort as any) || "created_at",
      order: (order as any) || "desc",
      page: parseInt(page as string, 10),
      pageSize: parseInt(pageSize as string, 10),
    });
    res.json(result);
  }
  static async findById(req: Request, res: Response) {
    const row = await ClientService.findById(+req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    res.json(row);
  }
  static async create(req: Request, res: Response) {
    const payload = createSchema.parse(req.body);
    const row = await ClientService.create(payload as any);
    res.status(201).json(row);
  }
  static async update(req: Request, res: Response) {
    const payload = createSchema.partial().parse(req.body);
    const row = await ClientService.update(+req.params.id, payload as any);
    res.json(row);
  }
  static async remove(req: Request, res: Response) {
    res.json(await ClientService.remove(+req.params.id));
  }
}
