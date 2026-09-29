'use client'

import { useState } from 'react'
import { AddOnModal, type AddOnModalData } from './AddOnModal'
import { MediaTextSection } from '@/components/shared/MediaTextSection'

// Frozen snapshot of the pre-redesign Add-Ons section, kept only for the
// /packages-1 client-preview route. The live /packages page uses the redesigned
// ./AddOnsSection (rate-card ledger), which replaced this file in place —
// hence the copy rather than a shared import. Delete together with /packages-1.

const adsModalData: AddOnModalData = {
  title: 'Ads Management (Per Month)',
  pricingBullets: [
    'Php 4,000.00 per month (for Php 10,000 pesos worth of ad budget)',
    'Php 8,000.00 per month (for Php 20,000 pesos worth of ad budget)',
    'Php 12,000.00 per month (for Php 30,000 pesos worth of ad budget)',
  ],
  featureBullets: [
    'Management for SET AMOUNT of ad budget (client funded)',
    'Optimizations and targeting protocol',
    'Report',
  ],
  buttonText: 'Inquire Now',
  buttonLink: '/contact',
}

const influencerModalData: AddOnModalData = {
  title: 'Influencer Management (Per Influencer)',
  pricingBullets: [
    'Php 10,000.00 per month (for 1 extra influencer)',
    'Php 20,000.00 per month (for 2 extra influencers)',
    'Php 40,000.00 per month (for 5 extra influencers)',
  ],
  featureBullets: [
    'SET AMOUNT micro Influencer to post FB/IG (client will provide x-deal)',
    'Rights and ownership to (SET AMOUNT Influencer vertical video 15–30s)',
  ],
  buttonText: 'Inquire Now',
  buttonLink: '/contact',
}

export function LegacyAddOnsSection() {
  const [activeAddOnModal, setActiveAddOnModal] = useState<AddOnModalData | null>(null)

  return (
    <>
      <MediaTextSection
        variant="light"
        title="Ads Management (Per Month)"
        bulletPoints={[
          "Management for SET AMOUNT of ad budget (client funded)",
          "Optimizations and targeting protocol",
          "Report",
        ]}
        buttonText="Learn More"
        onButtonClick={() => setActiveAddOnModal(adsModalData)}
        imageSrc="/images/ads-manager.jpg"
        imageAlt="Creative team working"
        imagePosition="left"
        bgColor=""
        bgImage=""
      />
      <MediaTextSection
        variant="light"
        title="Influencer Management (Per Influencer)"
        bulletPoints={[
          "SET AMOUNT micro Influencer to post FB/IG (client will provide x-deal)",
          "Rights and ownership to (SET AMOUNT Influencer vertical video 15–30s)",
        ]}
        buttonText="Learn More"
        onButtonClick={() => setActiveAddOnModal(influencerModalData)}
        imageSrc="/images/influencer.jpg"
        imageAlt="Creative team working"
        imagePosition="right"
        bgColor=""
        bgImage=""
      />

      {activeAddOnModal && (
        <AddOnModal data={activeAddOnModal} onClose={() => setActiveAddOnModal(null)} />
      )}
    </>
  )
}
