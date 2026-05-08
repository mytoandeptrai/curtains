"use client";

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React, { type PropsWithChildren } from 'react';
import AppHeader from './components/app-header';
import AppSidebar from './components/app-sidebar';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className='mt-16 h-[calc(100dvh-64px)]'>
      <div className='flex flex-1 flex-col p-4 pt-0'>
        {children}
      </div>
    </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
