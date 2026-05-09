'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import QueryClientProvider from '@/components/providers/QueryClientProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import type { ReactNode } from 'react';

export interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <NuqsAdapter>
      <QueryClientProvider>
        <ThemeProvider>
          <>{children}</>
          <ProgressBar height='4px' color='#a12d23' options={{ showSpinner: false }} shallowRouting />
        </ThemeProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}

export default Providers;
