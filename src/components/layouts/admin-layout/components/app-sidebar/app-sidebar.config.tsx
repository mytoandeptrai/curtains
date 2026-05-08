import type { NavItem } from '@/types';
import { ROUTES } from '@/utils/routes';
import {
  BookOpenIcon,
  CalendarIcon,
  FolderIcon,
  LayoutDashboardIcon,
  PackageIcon,
  SettingsIcon,
  User2Icon,
  Users2Icon,
  WrenchIcon,
} from 'lucide-react';

export const navItems = (): NavItem[] => [
  {
    title: 'Dashboard',
    url: ROUTES.ADMIN_DASHBOARD,
    icon: LayoutDashboardIcon,
    isActive: false,
    shortcut: ['h', 'h'],
    items: [],
  },
  {
    title: 'Categories',
    url: ROUTES.ADMIN_CATEGORIES,
    icon: FolderIcon,
    isActive: false,
    shortcut: ['c', 'c'],
    items: [],
  },
  {
    title: 'Products',
    url: ROUTES.ADMIN_PRODUCTS,
    icon: PackageIcon,
    isActive: false,
    shortcut: ['p', 'p'],
    items: [],
  },
  {
    title: 'Leads',
    url: ROUTES.ADMIN_LEADS,
    icon: Users2Icon,
    isActive: false,
    shortcut: ['l', 'l'],
    items: [],
  },
  {
    title: 'Bookings',
    url: ROUTES.ADMIN_BOOKINGS,
    icon: CalendarIcon,
    isActive: false,
    shortcut: ['b', 'b'],
    items: [],
  },
  {
    title: 'Blog',
    url: ROUTES.ADMIN_BLOG,
    icon: BookOpenIcon,
    isActive: false,
    shortcut: ['g', 'g'],
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
        shortcut: ['p', 'r'],
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
