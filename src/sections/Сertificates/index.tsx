import { Header } from '@/components/TextContent/Header'
import { Container } from '@/components/Container'
import styles from './Certificates.module.scss'

export const Certificates = () => {
  return (
    <section className={styles.section}>
      <Container>
        <Header title='Certyfikaty' description='Certyfikaty' />
      </Container>
    </section>
  )
}
