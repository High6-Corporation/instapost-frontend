import Image from 'next/image'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'

// Fallback content — used until the About hero query is wired up.
// mainHeading supports inline HTML; <strong> renders in the brand yellow token.
const EYEBROW = 'About Insta Post'
const FALLBACK_HEADING = 'Born in Marikina.<br /><strong>Built on receipts.</strong>'
const FALLBACK_SUBTEXT =
  "Insta Post is a Filipino, founder-led advertising agency. In five years we've grown from a small Marikina studio into a 17-strong team behind 100+ brands — by refusing to sell work we can't measure."
const FALLBACK_IMAGE = '/images/advantage-main-img.jpg'

interface HeroSectionData {
  preHeader: string
  mainHeading: string
  subtext: string
  backgroundImage: {
    node: {
      sourceUrl: string
      altText: string
    } | null
  } | null
}

interface HeroSectionProps {
  data?: HeroSectionData | null
}

export function HeroSection({ data }: HeroSectionProps) {
  const eyebrow = data?.preHeader || EYEBROW
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const image = data?.backgroundImage?.node?.sourceUrl || FALLBACK_IMAGE
  const alt = data?.backgroundImage?.node?.altText || EYEBROW

  return (
    <Section className="relative flex items-center overflow-hidden h-full">
      {/* Background image */}
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_100%] max-xl:origin-bottom max-xl:scale-110 max-lg:scale-125 max-sm:!scale-[1.20]"
      />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <Row className="relative z-10 flex flex-col items-center gap-2 sm:gap-4 text-center mb-[20px] xl:!mb-[60px] !mt-[35%] xl:!mt-[32%]">
        {/* Eyebrow */}
        <p className="body-sm !font-normal tracking-wide text-secondary">
          {eyebrow}
        </p>

        {/* Main heading — bolded text renders in brand yellow at the SAME weight (bold is just a colour marker) */}
        <h1
          className="heading-1 max-sm:!leading-[32px] !font-normal !tracking-[-2%] text-neutral-0 [&_b]:font-normal [&_b]:text-secondary [&_p]:m-0 [&_strong]:font-normal [&_strong]:text-secondary"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        {/* Subtext */}
        <p className="body-md mx-auto max-w-[900px] text-neutral-0">{subtext}</p>
      </Row>
    </Section>
  )
}

export default HeroSection
