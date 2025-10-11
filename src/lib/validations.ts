import { z } from "zod"

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  mobileNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number in E.164 format (e.g., +1234567890)"),
  email: z.string().email("Please enter a valid email address"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  message: z.string().min(10, "Message must be at least 10 characters").optional(),
  honeypot: z.string().optional() // Honeypot field for spam protection
})

export const serviceOptions = [
  { value: "brand-strategy-design", label: "Branding/Brand Strategy & Design" },
  { value: "social-media-management", label: "Social Media Management" },
  { value: "content-creation", label: "Content Creation" },
  { value: "gmb-management", label: "GMB Management" },
  { value: "production", label: "Production" },
  { value: "online-reputation-management", label: "ORM" },
  { value: "anything-else", label: "Anything else" }
] as const

export type ContactFormData = z.infer<typeof contactFormSchema>
