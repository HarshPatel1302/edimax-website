import { Section } from '@/components/section'
import { ContactForm } from '@/components/contact-form'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Edimax Creations. We\'re here to help transform your business into a lifestyle-driven brand. Contact us today!',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ready to transform your business into a brand? We'd love to hear about your project and discuss how we can help you achieve your digital marketing goals.
          </p>
        </div>
      </Section>

      {/* Contact Form */}
      <Section className="py-8 md:py-12">
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        title="Frequently Asked Questions"
        description="Quick answers to common questions about working with us."
        className="py-8 md:py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-muted/50 to-background">
                <CardContent className="p-8">
                  <h3 className="font-semibold text-xl text-foreground mb-4">
                    How quickly do you respond?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                  </p>
                </CardContent>
              </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-muted/50 to-background">
            <CardContent className="p-8">
              <h3 className="font-semibold text-xl text-foreground mb-4">
                Do you work with remote clients?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely! We work with clients across India and internationally. Our digital-first approach makes remote collaboration seamless.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-muted/50 to-background">
            <CardContent className="p-8">
              <h3 className="font-semibold text-xl text-foreground mb-4">
                What's your typical project timeline?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Project timelines vary depending on scope and complexity. We'll provide a detailed timeline during our initial consultation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-muted/50 to-background">
            <CardContent className="p-8">
              <h3 className="font-semibold text-xl text-foreground mb-4">
                Do you offer free consultations?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! We offer a free initial consultation to discuss your project, understand your goals, and determine how we can help.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
