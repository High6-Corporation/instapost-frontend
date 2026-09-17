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

      {/* Legibility scrim.
          Was a flat bg-black/50, but the client's new group photo has a bright
          white studio wall exactly where the centred heading/subtext sit, so a
          uniform tint had to go too dark before the copy read cleanly — and that
          kills the faces. All overlaid text falls in the lower half of the hero
          (Row uses !mt-[35%]), so weight the darkness there instead: heaviest at
          the bottom under the subtext, light at the top where nothing sits.
          Measured at a 1280px layout viewport: flat/50 crushed every bright pixel
          in the photo (0% above mid-tone) and still scored worse on the heading
          (3.58 vs 4.70) and the subtext (4.28 vs 7.29).
          via is /45 rather than /35 to cover the 16px yellow eyebrow at ~56%
          height, the thinnest text on the brightest part of the frame.
          black/* is a built-in Tailwind colour, so the /opacity modifier works —
          the project's var-based tokens (neutral-0 etc.) silently drop it. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/10" />

      {/* Content */}
      <Row className="relative z-10 flex flex-col items-center text-center mb-[20px] xl:!mb-[60px] !mt-[35%] xl:!mt-[32%]">
        {/* Eyebrow */}
        <p className="caption w-full text-center uppercase tracking-[2px] text-secondary">
          {eyebrow}
        </p>

        {/* Main heading — bolded text renders in brand yellow at the SAME weight (bold is just a colour marker) */}
        <h1
          className="heading-1 max-sm:!leading-[32px] !font-normal !tracking-[-2%] text-neutral-0 [&_b]:font-normal [&_b]:text-secondary [&_p]:m-0 [&_strong]:font-normal [&_strong]:text-secondary"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        {/* Subtext */}
        <p className="body-md mx-auto max-w-[900px] mt-6 text-neutral-0">{subtext}</p>
      </Row>
    </Section>
  )
}

export default HeroSection
