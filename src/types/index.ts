import { LucideIcon } from 'lucide-react';
import type { FC, PropsWithChildren, SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IMeta {
  code: number;
  message: string;
}

export type TResponse<T> = {
  meta: IMeta;
  data: T;
};

export type FCC<P = {}> = FC<PropsWithChildren<P>>;

export interface IOption<T> {
  label: string;
  value: T;
}

export interface IPagination {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaging {
  page: number;
  limit: number;
  total?: number;
}

export type TCommonSort = 'ASC' | 'DESC';

export interface PermissionCheck {
  permission?: string;
  role?: string;
  type?: string;
}

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: LucideIcon;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
  access?: PermissionCheck;
}

export interface BaseResponseType<T = unknown> {
  data?: T;
  code: number;
  message?: string;
}

export type IPaginatedResponseType<T> = {
  data: T;
  pagination: {
    hasNext: boolean;
    hasPrev: boolean;
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
};
