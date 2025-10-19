import { z } from "zod"

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  mobileNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^(\+91|91)?[6-9]\d{9}$/, "Please enter a valid Indian mobile number (e.g., 7977051147 or +91 7977051147)"),
  email: z.string().email("Please enter a valid email address"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  message: z.string().optional(),
  honeypot: z.string().optional() // Honeypot field for spam protection
})

export const serviceOptions = [
  { value: "brand-strategy-design", label: "Branding/Brand Strategy & Design" },
  { value: "social-media-management", label: "Social Media Management" },
  { value: "gmb-management", label: "GMB Management" },
  { value: "production", label: "Production" },
  { value: "online-reputation-management", label: "ORM" },
  { value: "anything-else", label: "Anything else" }
] as const

export type ContactFormData = z.infer<typeof contactFormSchema>
