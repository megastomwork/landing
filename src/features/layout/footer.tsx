'use client';

import { LogoDark } from '@/shared/components/ui-kit/logo-dark';
import { FooterContacts } from './ui/footer-contacts';
import { FooterMenu } from './ui/footer-menu';
import { FooterSocials } from './ui/footer-socials';

export const Footer = () => {
  return (
    <div className="bg-accent-80">
      <div className="mx-auto flex w-full max-w-[1200px] justify-between px-4 py-8 max-sm:flex-wrap sm:px-6 md:px-10">
        <div className="w-[250px] max-sm:hidden">
          <FooterContacts />
        </div>
        <div className="flex w-1/3 items-center justify-center px-2 max-sm:w-full">
          <div className="mx-auto max-sm:w-[200px]">
            <LogoDark />
          </div>
        </div>
        <div className="flex justify-center max-sm:mt-4 max-sm:w-full max-sm:flex-row-reverse max-sm:gap-5">
          <div className="sm:w-[100px] lg:w-[200px]">
            <FooterMenu />
          </div>
          <div className="">
            <FooterSocials />
          </div>
        </div>
      </div>
    </div>
  );
};
