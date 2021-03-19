import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import WizardProvider from '../contextApi/WizardProvider';
import '../styles/style.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Font imports  */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
        // eslint-disable-next-line
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;0,800;1,400&family=Over+the+Rainbow&family=Poppins:wght@800;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://kit.fontawesome.com/e560f4db6b.js" crossOrigin="anonymous" />
      </Head>
      <WizardProvider>
        <Component {...pageProps} />
      </WizardProvider>
    </>
  );
}

export default MyApp;
