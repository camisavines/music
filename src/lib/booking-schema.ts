import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{6,14}$/,
      "Please enter a valid phone number (e.g. +12025551234)"
    ),

  eventType: z.enum(
    ["Wedding", "Club Night", "Corporate Event", "Private Party", "Festival", "Birthday", "Other"],
    { required_error: "Please select an event type" }
  ),

  eventDate: z
    .string()
    .min(1, "Event date is required")
    .refine((val) => {
      const d = new Date(val);
      return !isNaN(d.getTime()) && d > new Date();
    }, "Event date must be in the future"),

  eventTime: z
    .string()
    .min(1, "Event start time is required"),

  venueName: z
    .string()
    .min(2, "Venue name must be at least 2 characters")
    .max(150, "Venue name is too long"),

  venueAddress: z
    .string()
    .min(5, "Venue address is required")
    .max(300, "Address is too long"),

  guestCount: z
    .string()
    .min(1, "Estimated guest count is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 100000,
      "Please enter a valid guest count (1–100,000)"
    ),

  musicalPreferences: z
    .string()
    .min(5, "Please describe the musical vibe (at least 5 characters)")
    .max(500),

  equipmentRequirements: z
    .string()
    .max(500, "Equipment notes are too long")
    .optional()
    .or(z.literal("")),

  additionalNotes: z
    .string()
    .max(1000, "Additional notes are too long")
    .optional()
    .or(z.literal("")),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
