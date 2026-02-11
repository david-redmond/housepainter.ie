import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(1, "Name is required."),
  phone: z.string().min(1, "Phone number is required."),
  email: z.string().email("Please enter a valid email address."),
  addressOrEircode: z.string().min(1, "Address or Eircode is required."),
  message: z.string().min(1, "Please tell us a little about the project."),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required to proceed.",
  }),
  companyWebsite: z.string().optional(),
});

export type QuotePayload = z.infer<typeof quoteSchema>;
