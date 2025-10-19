import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { Resend } from 'resend'

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

    // Send email notification using Resend
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'contact@edimaxcreations.com',
      to: [process.env.CONTACT_TO || 'edimaxcreations@gmail.com'],
      subject: 'New Contact Form Submission - Edimax Creations',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #b61d23; border-bottom: 2px solid #b61d23; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedData.email}" style="color: #b61d23;">${validatedData.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${validatedData.mobileNumber}" style="color: #b61d23;">${validatedData.mobileNumber}</a></p>
            <p><strong>Services Interested In:</strong> ${validatedData.services.join(', ')}</p>
            ${validatedData.message ? `<p><strong>Message:</strong></p><div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #b61d23;">${validatedData.message}</div>` : '<p><strong>Message:</strong> No message provided</p>'}
          </div>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #6c757d;">
              <strong>Submission Details:</strong><br>
              Time: ${new Date().toLocaleString()}<br>
              IP: ${ip}
            </p>
          </div>
          
          <p style="margin-top: 30px; text-align: center; color: #6c757d; font-size: 14px;">
            This email was sent from the Edimax Creations contact form.
          </p>
        </div>
      `
    })

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
