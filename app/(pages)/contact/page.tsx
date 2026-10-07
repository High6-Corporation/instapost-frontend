import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SubpageBanner from '@/components/shared/SubpageBanner'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Image from 'next/image'
import ContactFormSection from '@/components/sections/contact/ContactFormSection'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('contact-us', '/contact')
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      {/* Header */}
      <Header variant="sticky" />

      {/* Subpage Banner */}
      <SubpageBanner title="Contact Us" />

      {/* Main Content */}
      <Section className="py-[24px] md:py-[40px] lg:py-[70px]">
        <Row className="!max-w-[1281px] flex flex-col lg:flex-row gap-8 md:gap-[40px] lg:gap-[60px]">
          {/* Left Column - Contact Info */}
          <div className="flex flex-col gap-4 md:gap-[30px] w-full lg:w-auto">
            {/* Heading & Description */}
            <div className="flex flex-col gap-2 md:gap-6 lg:gap-[30px]">
              <h2 className="heading-2 font-normal text-neutral-900">
                Get in Touch!
              </h2>
              <p className="body-md text-neutral-500">
                Whether you have a product inquiry, need customer support, or want to explore partnership opportunities, our team is ready to assist you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-[15px]">
              {/* Location */}
              <a href="https://maps.app.goo.gl/bhcRGHEFYX8nXCZS9" target="_blank" rel="noopener noreferrer" className="flex gap-[7px] items-center group">
                <div className="relative w-[24px] h-[24px] shrink-0">
                  <Image
                    src="/icons/location-icon.svg"
                    alt="Location"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <p className="body-md text-neutral-500 group-hover:text-primary transition-colors">
                  12 Bldg. Sampaguita St., Sampaguita Village Brgy. Malanday, Marikina City, Philippines, 1805
                </p>
              </a>

              {/* Phone */}
              <a href="tel:09454421057" className="flex gap-[7px] items-center group">
                <div className="relative w-[24px] h-[24px] shrink-0">
                  <Image
                    src="/icons/contact-no-icon.svg"
                    alt="Phone"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <p className="body-md text-neutral-500 group-hover:text-primary transition-colors">
                  09454421057
                </p>
              </a>

              {/* Email */}
              <a href="mailto:inquire.instapost@gmail.com" className="flex gap-[7px] items-center group">
                <div className="relative w-[24px] h-[24px] shrink-0">
                  <Image
                    src="/icons/email-icon.svg"
                    alt="Email"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <p className="body-md text-neutral-500 group-hover:text-primary transition-colors">
                  inquire.instapost@gmail.com
                </p>
              </a>
            </div>

            {/* Social Media */}
            <div id="follow-us" className="flex flex-col gap-[10px]">
              <h3 className="heading-3 font-medium text-neutral-900">
                Follow Us
              </h3>
              <div className="flex gap-[13px]">
                <a href="https://www.facebook.com/instapostph/" target="_blank" rel="noopener noreferrer" className="relative rounded-full w-[40px] h-[40px] bg-primary hover:bg-secondary hover:shadow-[0px_0px_16px_0px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300">
                  <Image
                    src="/icons/fb-icon.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
                <a href="https://www.instagram.com/instapostph/" target="_blank" rel="noopener noreferrer" className="relative rounded-full w-[40px] h-[40px] bg-primary hover:bg-secondary hover:shadow-[0px_0px_16px_0px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300">
                  <Image
                    src="/icons/ig-icon.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
                <a href="https://www.tiktok.com/@instapostph" target="_blank" rel="noopener noreferrer" className="relative rounded-full w-[40px] h-[40px] bg-primary hover:bg-secondary hover:shadow-[0px_0px_16px_0px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300">
                  <Image
                    src="/icons/tiktok-icon.svg"
                    alt="TikTok"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form (Gravity Forms + CleanTalk) */}
          <div className="w-full lg:max-w-[630px] rounded-[24px] p-4 md:px-[30px] md:py-[44.5px]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(253,209,13,0.2) 0%, rgba(253,209,13,1) 100%)'
            }}
          >
            <ContactFormSection />
          </div>
        </Row>
      </Section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
