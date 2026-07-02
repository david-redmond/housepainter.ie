import { z } from "zod";

export const projectTypeOptions = [
  "Interior Painting",
  "Exterior Painting",
  "Commercial",
  "Wallpapering",
  "Woodwork",
  "Other / Not sure",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "Just planning / getting prices",
] as const;

export const preferredContactOptions = ["Phone", "Email", "WhatsApp"] as const;

export const attributionSchema = z
  .object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
    referrer: z.string().max(500).optional(),
    landingPath: z.string().max(500).optional(),
  })
  .optional();

export const quoteSchema = z.object({
  name: z.string().min(1, "Name is required."),
  phone: z.string().min(1, "Phone number is required."),
  email: z.string().email("Please enter a valid email address."),
  addressOrEircode: z.string().min(1, "Address or Eircode is required."),
  projectType: z.string().max(120).optional(),
  timeline: z.string().max(120).optional(),
  preferredContact: z.string().max(60).optional(),
  message: z.string().min(1, "Please tell us a little about the project."),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required to proceed.",
  }),
  companyWebsite: z.string().optional(),
  attribution: attributionSchema,
});

export type QuotePayload = z.infer<typeof quoteSchema>;
export type Attribution = z.infer<typeof attributionSchema>;
