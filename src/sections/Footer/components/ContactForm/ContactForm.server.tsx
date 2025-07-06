import { Locale } from '@/config/i18n'
import styles from './ContactForm.module.scss'
import { Paragraph } from '@/components/TextContent/Paragraph'
import plTranslations from '@/translations/pl/footer.json'
import uaTranslations from '@/translations/ua/footer.json'
import { HeaderContent } from '@/components/TextContent/HeaderContent'
import { ContactFormClient } from './ContactForm.client'

const translations = {
  pl: plTranslations,
  ua: uaTranslations,
} as const

type ContactFormProps = {
  locale: Locale
}

export const ContactForm = ({ locale }: ContactFormProps) => {
  const t = translations[locale]

  return (
    <div className={styles.contactForm}>
      <HeaderContent description={t.formTitle} className={styles.content} headerClassName={styles.header}>
        <Paragraph className={styles.description} text={t.formDescription} />
      </HeaderContent>
      <ContactFormClient locale={locale} />
    </div>
  )
}
