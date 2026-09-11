import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Fallback content
const FALLBACK_HEADING = 'Ready for returns you can measure?'
const FALLBACK_SUBTEXT = 'Book a discovery call. Bring your numbers — we\'ll bring ours, including the cases closest to your category and a straight answer on what\'s achievable.'

interface HomeCtaSectionProps {
  data?: {
    mainHeading: string
    subtext: string
  } | null
}

export function HomeCtaSection({ data }: HomeCtaSectionProps) {
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-white relative overflow-hidden py-[40px] md:py-[64px] lg:py-[70px]">
        <Row 
          className="!max-w-[1272px] box-border p-8 md:p-14 lg:py-[82px] lg:px-16 relative rounded-[32px] !bg-primary overflow-hidden" 
        >
        {/* Background Image with Opacity */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/cta-background.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.3',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-[32px]">
          {/* Text Content */}
          <div className="flex flex-col gap-4 items-center max-w-[770px] w-full">
            <h2 className="heading-2 font-normal text-neutral-0 text-center">
              {heading}
            </h2>
            <p className="body-lg font-medium text-neutral-0 text-center">
              {subtext}
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/contact">
            <Button
              variant="white"
              className="shadow-[0px_0px_7px_rgba(0,0,0,0.16)] heading-3 font-semibold whitespace-nowrap"
              showArrow={true}
            >
              Book a Discovery Meeting with Us
            </Button>
          </Link>
        </div>

        {/* Decorative Social Icons - Top Left */}
        <div className="max-[500px]:hidden block absolute left-1/2 top-1/2 -translate-x-[250px] -translate-y-[120px] md:-translate-x-[300px] md:-translate-y-[152px] lg:-translate-x-[452px] lg:-translate-y-[152px]">
          <div className="relative w-[120px] h-[50px] md:w-[150px] md:h-[60px] lg:w-[197px] lg:h-[106px]">
            <Image
              src="/icons/social-icons-cta-left.png"
              alt="Social icons decoration"
              width={197}
              height={106}
              className="object-contain opacity-60"
            />
          </div>
        </div>

        {/* Decorative Social Icons - Top Right */}
        <div className="max-[500px]:hidden block absolute left-1/2 top-1/2  -translate-x-[-120px] -translate-y-[100px] md:-translate-x-[-150px] md:-translate-y-[150px] lg:-translate-x-[-245px] lg:-translate-y-[180px]">
          <div className="relative w-[120px] h-[50px] md:w-[140px] md:h-[50px] lg:w-[182px] lg:h-[99px]">
            <Image
              src="/icons/social-icons-cta-right.png"
              alt="Social icons decoration"
              width={182}
              height={99}
              className="object-contain opacity-60"
            />
          </div>
        </div>
      </Row>
    </Section>
    </ScrollAnimationWrapper>
  )
}
