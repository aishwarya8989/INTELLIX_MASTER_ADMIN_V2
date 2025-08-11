import { z } from "zod";

export const instituteSchema = z.object({
  name: z.string().trim().min(3).max(100),
  code: z.string().trim().min(2).max(10),
  url: z.string().url().optional().or(z.literal("").transform(() => undefined)),
  machineId: z.string().optional(),
  active: z.boolean().optional(),
});
