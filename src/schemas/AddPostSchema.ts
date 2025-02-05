import * as z from "zod";

export const AddPostSchema = z.object({
  title: z.string().trim().min(3, { message: "Pavadinimas privalomas" }),
  body: z.string().trim().min(3, { message: "Tekstas privalomas" }),
  userId: z.string().trim().min(1, { message: "Prašome pasirinkti autorių" }),
});
