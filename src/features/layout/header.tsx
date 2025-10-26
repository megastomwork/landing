'use client';

import Logo from '@/shared/components/ui-kit/logo';
import { X as CloseIcon, Menu as MenuIcon } from 'lucide-react';
import ButtonHeader from './ui/button-header';
import { HeaderMenu } from './ui/header-menu';
import { HeaderSocials } from './ui/header-socials';
import { AnimatePresence, motion } from 'framer-motion';
import { useMenuVisibility } from '@/shared/hooks/use-menu-visibility';

export function Header() {
  const { menuVisible, toggleMenu, menuRef, closeMenu } = useMenuVisibility();

  return (
    <div
      className="relative mx-auto flex h-[104px] w-full max-w-7xl items-center justify-between bg-white px-4 sm:px-4 md:px-10 lg:px-16 xl:px-20"
      ref={menuRef}
    >
      <Logo />

      <button className="p-2 sm:hidden" onClick={toggleMenu}>
        {menuVisible ? (
          <CloseIcon size={28} color="#34E6F6" />
        ) : (
          <MenuIcon size={28} color="#34E6F6" />
        )}
      </button>

      {/* Desktop Menu */}
      <div className="hidden items-center sm:flex">
        <HeaderMenu className="flex-row" />
        <div className="ml-8">
          <ButtonHeader />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute left-0 top-[104px] z-50 w-full flex-col bg-white shadow-md sm:hidden"
          >
            <div className="flex flex-col p-4">
              <HeaderMenu className="flex flex-col" onClose={closeMenu} />
              <div className="mt-4">
                <HeaderSocials />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
