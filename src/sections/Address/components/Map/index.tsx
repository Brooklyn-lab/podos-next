import styles from './Map.module.scss'

type MapProps = {
  mapUrl: string
}

export const Map = ({ mapUrl }: MapProps) => {
  return (
    <iframe
      src={mapUrl}
      width='100%'
      height='390'
      className={styles.map}
      allowFullScreen
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
    ></iframe>
  )
}
