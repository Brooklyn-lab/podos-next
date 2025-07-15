'use client'

import { useState, useEffect } from 'react'
import { Locale } from '@/config/i18n'
import { NavList } from '../Nav'
import { LangSwitcher } from '../LangSwitcher'
import { Contacts } from '../Contacts'
import { Logo } from '@/components/Logo'
import { BurgerButton } from '@/components/BurgerButton'
import { CloseButton } from '@/components/CloseButton'
import styles from './MobileMenu.module.scss'

type MobileMenuProps = {
  locale: Locale
}

export const MobileMenu = ({ locale }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedMenuState = sessionStorage.getItem('mobileMenuOpen')
    if (savedMenuState === 'true') {
      setIsOpen(true)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('mobileMenuOpen', isOpen.toString())
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.mobileMenu}>
      <BurgerButton isOpen={isOpen} onClick={toggleMenu} />

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={toggleMenu} />
          <nav className={styles.menu}>
            <div className={styles.menuHeader}>
              <Logo />
              <CloseButton onClick={toggleMenu} />
            </div>

            <div className={styles.menuContent}>
              <NavList locale={locale} onItemClick={closeMenu} />

              <div className={styles.menuContacts}>
                <LangSwitcher locale={locale} />
                <Contacts locale={locale} isMobileStyle />
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  )
}
