import type { NavItem } from '@/types';
import { ROUTES } from '@/utils/routes';
import {
  ArrowLeftRightIcon,
  CircleDollarSignIcon,
  LayoutDashboardIcon,
  MenuIcon,
  SettingsIcon,
  User2Icon,
  Users2Icon,
  Wallet2Icon,
  WrenchIcon,
} from 'lucide-react';

export const navItems = (): NavItem[] => [
  {
    title: 'Home',
    url: ROUTES.ADMIN_DASHBOARD,
    icon: LayoutDashboardIcon,
    isActive: false,
    shortcut: ['h', 'h'],
    items: [],
  },
  {
    title: 'Settings',
    url: ROUTES.ADMIN_SYSTEM,
    icon: SettingsIcon,
    shortcut: ['s', 's'],
    isActive: false,
    items: [
      {
        title: 'Profile',
        url: ROUTES.ADMIN_ME,
        icon: User2Icon,
        shortcut: ['p', 'p'],
      },
      {
        title: 'System',
        url: ROUTES.ADMIN_SYSTEM,
        icon: WrenchIcon,
        shortcut: ['s', 't'],
      },
    ],
  },
];
