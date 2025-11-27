import type { Media } from '@/shared/payload/payload-types';

// Extended MenuItem for components with active state
export interface MenuItemWithState {
  label: string;
  link: string;
  isSelected?: boolean;
}

// Logo Props
export interface LogoProps {
  media?: Media;
  alt?: string;
  className?: string;
  priority?: boolean;
}

// Site settings data with typed structure
export interface SiteSettingsData {
  logo?: Media;
  logoAlt?: string;
  menuItems: MenuItemWithState[];
  contactButton: {
    text: string;
    showInHeader: boolean;
    showInMobileMenu: boolean;
  };
  footer: {
    menuTitle: string;
    showContacts: boolean;
    showWorkingHours: boolean;
    workingHoursTitle?: string;
  };
}
