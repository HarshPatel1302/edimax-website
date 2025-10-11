import { Section } from '@/components/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Edimax Creations - Read our terms and conditions for using our digital marketing services.',
}

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            These terms and conditions govern your use of our digital marketing services. Please read them carefully.
          </p>
        </div>
      </Section>

      {/* Terms Content */}
      <Section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-muted/50 to-background">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Last Updated: {new Date().toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Edimax Creations services, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Services Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Edimax Creations provides digital marketing services including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Social Media Management</li>
                  <li>Content Creation and Strategy</li>
                  <li>Brand Strategy & Design</li>
                  <li>Google My Business Management</li>
                  <li>Production (Photo & Video)</li>
                  <li>Online Reputation Management</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Client Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a client, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Timely approval of content and campaigns</li>
                  <li>Payment of fees as agreed upon</li>
                  <li>Compliance with all applicable laws and regulations</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Payment Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Payment terms will be specified in individual service agreements. All fees are non-refundable unless otherwise stated in writing.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content created by Edimax Creations remains our intellectual property until full payment is received. Upon completion of payment, clients receive usage rights as specified in the service agreement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Edimax Creations shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate services with written notice. Termination does not relieve either party of obligations incurred prior to termination.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Mumbai, Maharashtra.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:edimaxcreations@gmail.com" className="text-accent-start hover:text-accent-end transition-colors">
                    edimaxcreations@gmail.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}