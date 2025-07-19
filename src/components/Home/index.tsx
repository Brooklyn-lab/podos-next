import { Locale } from '@/config/i18n'
import { AboutSection } from '@/sections/About'
import { AddressSection } from '@/sections/Address'
import { WhyUsSection } from '@/sections/WhyUs'
import { HeroSection } from '@/sections/Hero'
import { ServicesSection } from '@/sections/Services'
import { CertificatesSection } from '@/sections/Certificates'
import { WorksSection } from '@/sections/Works'
import { Footer } from '@/sections/Footer'
import { Header } from '@/sections/Header'

type HomeProps = {
  locale: Locale
}

export const Home = ({ locale }: HomeProps) => {
  return (
    <>
      <Header locale={locale} />
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <WhyUsSection locale={locale} />
      <CertificatesSection locale={locale} />
      <ServicesSection locale={locale} />
      <AddressSection locale={locale} />
      <WorksSection locale={locale} />
      <Footer locale={locale} />
    </>
  )
}
