import { ReactNode, useState } from 'react';
import Footer from './_partials/Footer';
import Header from './_partials/Header';

const index = ({
  scrollToContact,
  scrollToWizard,
  children,
}: {
  scrollToContact: () => void,
  scrollToWizard: () => void,
  children: ReactNode
}) => (
  <div className="min-h-screen flex flex-col w-full">
    <Header
      scrollToContact={scrollToContact}
      scrollToWizard={scrollToWizard}
    />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

export default index;
