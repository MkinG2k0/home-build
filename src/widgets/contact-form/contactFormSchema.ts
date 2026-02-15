import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Обязательное поле"),
  phone: z.string().min(1, "Обязательное поле"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
