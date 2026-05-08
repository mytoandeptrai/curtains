import React, { type PropsWithChildren } from 'react';
import Footer from './components/footer';
import Header from './components/header';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
