import { Section } from '@/components/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Edimax Creations - Learn how we protect and handle your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our services.
          </p>
        </div>
      </Section>

      {/* Privacy Policy Content */}
      <Section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-muted/50 to-background">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Last Updated: {new Date().toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, contact us, or use our services.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Business information relevant to our services</li>
                  <li>Communication preferences and feedback</li>
                  <li>Website usage data and analytics</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to provide, maintain, and improve our services.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide and deliver our digital marketing services</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to access, update, or delete your personal information. You can contact us to exercise these rights.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
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