'use client'

// Adjust the import to use MENU_SELECTION
import { MENU_SELECTION } from '@/config' // Adjust the path as necessary
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { User } from '@/payload-types'


interface NavItemsProps {
  user: User;
}

function NavItems({ user }) {
  const [activeIndex, setActiveIndex] = useState<null | number>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  const isAnyOpen = activeIndex !== null

  const navRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div className='flex gap-4 h-full' ref={navRef}>
      {MENU_SELECTION.map((menu, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null)
          } else {
            setActiveIndex(i)
          }
        }

        const close = () => setActiveIndex(null)

        const isOpen = i === activeIndex

        // Update the props passed to NavItem according to the new structure
        return (
          <NavItem
            items={menu.items.filter(item => !item.requiredRoles || item.requiredRoles.length === 0 || user.role === 'admin' || user.role === 'user')}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={menu.label} // Use label as key since it's unique
            label={menu.label} // Pass label for button text
            isAnyOpen={isAnyOpen} />
        )
      })}
    </div>
  )
}

export default NavItems
