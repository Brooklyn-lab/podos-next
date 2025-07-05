import { Locale } from '@/config/i18n'
import { AboutSection } from '@/sections/About'
import { AddressSection } from '@/sections/Address'
import { WhyUsSection } from '@/sections/WhyUs'
import { HeroSection } from '@/sections/Hero'
import { ServicesSection } from '@/sections/Services'
import { CertificatesSection } from '@/sections/Certificates'

type HomeProps = {
  locale: Locale
}

export const Home = ({ locale }: HomeProps) => {
  return (
    <>
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <WhyUsSection locale={locale} />
      <CertificatesSection locale={locale} />
      <ServicesSection locale={locale} />
      <AddressSection locale={locale} />
    </>
  )
}
