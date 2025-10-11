import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { contactInfo, footerLinks } from '@/lib/constants'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-charcoal text-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/brand/edimax-white.png"
                alt="Edimax Creations Logo"
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Lifestyle-Driven Digital Marketing Agency. We blend creativity, strategy, and storytelling to build lifestyle-driven brands.
            </p>
            <p className="text-sm text-muted-foreground">
              Let's turn your business into a brand!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-off-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.slice(0, 6).map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-off-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-start mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent-start mt-0.5 flex-shrink-0" />
                <div>
                  <Link
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm text-muted-foreground hover:text-off-white transition-colors"
                  >
                    {contactInfo.phone}
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent-start mt-0.5 flex-shrink-0" />
                <div>
                  <Link
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-muted-foreground hover:text-off-white transition-colors"
                  >
                    {contactInfo.email}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Edimax Creations. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-off-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-off-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
