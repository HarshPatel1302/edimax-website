import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'

// Rate limiting map (in production, use Redis or a database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3 // 3 requests per window

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Validate the form data
    const validatedData = contactFormSchema.parse(body)
    
    // Check honeypot field (should be empty)
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      )
    }

    // Log the contact form submission (replace with your preferred method)
    console.log('Contact form submission:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip,
      userAgent: request.headers.get('user-agent')
    })

    // TODO: Replace with your preferred email service
    // Example implementations:

    // Option 1: Using Resend
    // const { Resend } = require('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // 
    // await resend.emails.send({
    //   from: 'contact@edimaxcreations.com',
    //   to: [process.env.CONTACT_TO || 'edimaxcreations@gmail.com'],
    //   subject: 'New Contact Form Submission',
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
    //     <p><strong>Email:</strong> ${validatedData.email}</p>
    //     <p><strong>Phone:</strong> ${validatedData.mobileNumber}</p>
    //     <p><strong>Services:</strong> ${validatedData.services.join(', ')}</p>
    //     <p><strong>Message:</strong> ${validatedData.message || 'No message provided'}</p>
    //   `
    // })

    // Option 2: Using webhook (n8n, Formspree, etc.)
    // const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(validatedData)
    //   })
    // }

    return NextResponse.json(
      { message: 'Thank you for your message! We will get back to you soon.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
