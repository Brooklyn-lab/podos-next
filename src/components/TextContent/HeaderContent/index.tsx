import { Header } from '@/components/TextContent/Header'
import { type ReactNode } from 'react'

type HeaderContentProps = {
  title?: string
  description?: string
  className?: string
  headerClassName?: string
  children?: ReactNode
}

export const HeaderContent = ({ title, description, className, headerClassName, children }: HeaderContentProps) => {
  if (className) {
    return (
      <div className={className}>
        <Header title={title} description={description} className={headerClassName} />
        {children}
      </div>
    )
  }

  return (
    <>
      <Header title={title} description={description} className={headerClassName} />
      {children}
    </>
  )
}
