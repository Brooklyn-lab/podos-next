import { AboutSection } from '@/sections/About'
import { AddressSection } from '@/sections/Address'
import { WhyUsSection } from '@/sections/WhyUs'
import { Locale } from '@/config/i18n'

type HomeProps = {
  locale: Locale
}

export const Home = ({ locale }: HomeProps) => {
  return (
    <>
      <AboutSection locale={locale} />
      <WhyUsSection locale={locale} />
      <AddressSection locale={locale} />
    </>
  )
}
