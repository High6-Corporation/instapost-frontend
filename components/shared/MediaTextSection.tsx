import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

interface MediaTextSectionProps {
  title?: string;
  description?: string;
  bulletPoints?: string[];
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  bgImage?: string;
  bgColor?: string;
  imagePosition?: 'left' | 'right';
  variant?: 'light' | 'dark' | 'primary';
  sectionClassName?: string;
}

export function MediaTextSection({
  title = 'Creative That Delivers Results',
  description = 'With over 10 years of expertise, we specialize in crafting high-quality photography, videography, graphics, and animations that don\'t just look good but deliver real results. We are your creative partner, turning every post into a powerful tool that builds engagement, drives conversions, and tells your brand\'s story.',
  bulletPoints,
  buttonText = 'Inquire Now',
  buttonLink = '/coming-soon',
  onButtonClick,
  showButton = true,
  imageSrc = '/images/about-fs-right.jpg',
  imageAlt = 'Creative team working',
  bgImage,
  bgColor,
  imagePosition = 'right',
  variant = 'dark',
  sectionClassName,
}: MediaTextSectionProps) {
  const isDark = variant === 'dark';
  const isPrimary = variant === 'primary';
  const sectionBg = bgColor ?? (isPrimary ? 'bg-primary' : isDark ? 'bg-[#222222]' : 'bg-white');
  const titleColor = isPrimary || isDark ? 'text-neutral-0' : 'text-neutral-900';
  const descColor = isPrimary ? 'text-neutral-0' : isDark ? 'text-neutral-400' : 'text-neutral-500';
  const buttonVariant = isPrimary ? 'white' : 'primary';

  return (
    <ScrollAnimationWrapper>
      <Section
        className={`${sectionBg} overflow-hidden relative ${sectionClassName ?? 'py-[24px] md:py-[40px] lg:py-[70px]'}`}
      >
        {bgImage && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${bgImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: '0.1',
            }}
          />
        )}
        <Row className={`!max-w-[1280px] relative z-10 flex ${imagePosition === 'left' ? 'flex-col min-[1140px]:flex-row' : 'flex-col-reverse min-[1140px]:flex-row'} justify-between items-center gap-6 md:gap-[40px]`}>

        {/* Image Column */}
        {imagePosition === 'left' && (
          <div className="relative w-full min-[1140px]:min-w-[594px] min-[1140px]:max-w-[594px] flex justify-center min-[1140px]:justify-start">
            <div className="relative h-[240px] w-full max-w-[594px] sm:h-[300px] md:h-[420px] min-[1140px]:h-[541px]">
              <Image src="/images/vector-yellow.png" alt="Yellow shape background" fill className="object-contain" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="relative shrink-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] min-[1140px]:w-[500px] min-[1140px]:h-[500px]">
                <div className="w-full h-full relative overflow-hidden rounded-[30px]">
                  <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Text Column */}
        <div className="w-full flex flex-col gap-[24px] md:gap-[30px] min-[1140px]:items-start items-center text-center min-[1140px]:text-left">
          {/* Title */}
          <h2 className={`heading-2 font-normal ${titleColor}`}>
            {title}
          </h2>

          {/* Description */}
          {bulletPoints && bulletPoints.length > 0 ? (
            <ul className={`body-md flex flex-col gap-2 ${descColor}`}>
              {bulletPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[7px] shrink-0 text-[12px] leading-none">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`body-md ${descColor}`}>
              {description}
            </p>
          )}

          {/* CTA Button */}
          {showButton && (
          <div>
            {onButtonClick ? (
              <Button variant={buttonVariant} showArrow={true} onClick={onButtonClick}>
                {buttonText}
              </Button>
            ) : (
              <Link href={buttonLink}>
                <Button variant={buttonVariant} showArrow={true}>
                  {buttonText}
                </Button>
              </Link>
            )}
          </div>
          )}
        </div>

        {/* Right Column - Visual */}
        {imagePosition === 'right' && (
        <div className="relative w-full min-[1140px]:min-w-[594px] min-[1140px]:max-w-[594px] flex justify-center min-[1140px]:justify-end">
          {/* Yellow Shape Background */}
          <div className="relative h-[240px] w-full max-w-[594px] sm:h-[300px] md:h-[420px] min-[1140px]:h-[541px]">
            <Image
              src="/images/vector-yellow.png"
              alt="Yellow shape background"
              fill
              className="object-contain"
            />
          </div>

          {/* Main Image - Centered on top */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative shrink-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] min-[1140px]:w-[500px] min-[1140px]:h-[500px]">
              <div className="w-full h-full relative overflow-hidden rounded-[30px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        )}
      </Row>
    </Section>
    </ScrollAnimationWrapper>
  )
}
