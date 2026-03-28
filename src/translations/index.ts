import plAbout from './pl/about.json'
import plAddress from './pl/address.json'
import plCookies from './pl/cookies.json'
import plFooter from './pl/footer.json'
import plForm from './pl/form.json'
import plHeader from './pl/header.json'
import plHero from './pl/hero.json'
import plWhyUs from './pl/why-us.json'

import uaAbout from './ua/about.json'
import uaAddress from './ua/address.json'
import uaCookies from './ua/cookies.json'
import uaFooter from './ua/footer.json'
import uaForm from './ua/form.json'
import uaHeader from './ua/header.json'
import uaHero from './ua/hero.json'
import uaWhyUs from './ua/why-us.json'

export const translations = {
  pl: {
    about: plAbout,
    address: plAddress,
    cookies: plCookies,
    footer: plFooter,
    form: plForm,
    header: plHeader,
    hero: plHero,
    'why-us': plWhyUs,
  },
  ua: {
    about: uaAbout,
    address: uaAddress,
    cookies: uaCookies,
    footer: uaFooter,
    form: uaForm,
    header: uaHeader,
    hero: uaHero,
    'why-us': uaWhyUs,
  },
} as const

export type TranslationNamespace = keyof (typeof translations)['pl']
