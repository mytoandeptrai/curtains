'use client';

import { ThemeProvider as NextThemeProvider } from '@teispace/next-themes';
import type { PropsWithChildren } from 'react';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <NextThemeProvider attribute='class' defaultTheme='system' enableSystem>{children}</NextThemeProvider>;
};

export default ThemeProvider;
