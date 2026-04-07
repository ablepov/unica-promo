import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя."),
  company: z.string().trim().min(2, "Укажите компанию."),
  deliveryModel: z.enum(["cloud", "on-prem", "hybrid"]),
  contact: z.string().trim().min(3, "Укажите способ связи."),
  message: z.string().trim().max(4000, "Слишком длинное описание.").optional(),
});
