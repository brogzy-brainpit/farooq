import React, { useEffect, useState } from 'react'
import { AnimatePresence,motion } from "framer-motion";
import { useRouter } from "next/router";
import { Anton,Instrument_Sans,DM_Sans,Hanken_Grotesk} from "next/font/google";
import Lenis from "@/providers/Lenis";

import "../styles/mostHave.css";
import "../styles/globals.css";

// import Footer from "@/components/Footer";
import localFont from "next/font/local";
import Script from "next/script";
// import SlideUpText from '@/effects/SlideUpText';
// import Header from '@/components/Header';
import Head from 'next/head';
import PageTransition from '@/component/PageTransition';
import Footer from '@/component/Footer';
import HeadSEO from '@/HeadSEO';

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});
const custom = localFont({
  src:  "./fonts/HostGrotesk-VariableFont_wght.ttf",
  // src:  "./fonts/MonumentExtended-Ultrabold.otf",

  // weight: "100 200 300 400 500 600 700 800 900",
  variable: "--font-custom",
 
});
const custoom = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-custom",
  display: "swap",
});



export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
const [preLoaderOut, setPreLoaderOut] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const extendedPageProps = {
    ...pageProps,
    preLoaderOut,
    isLoading,
};

useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
        setPreLoaderOut(true);
        document.body.style.cursor="default"
        window.scrollTo({top:0})
    }, 1400);
    return () => clearTimeout(timer);
}, []);
  
  
  useEffect(() => {
    setPreLoaderOut(true)
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // const handleRouteChange=(url)=>{
    //   setPageName(url)
    // }
    // router.events.on('routeChangeStart',handleRouteChange)
    // return ()=>{
    // router.events.off('routeChangeStart',handleRouteChange)
    // }
    // setPageName(router.pathname.replace('/',''))
  }, []);
 
  return (
    <Lenis>
    <AnimatePresence mode="wait">
      <HeadSEO/>

      <div key={router.asPath} className={`${body.variable} ${custom.variable}`} >
        <PageTransition/>       
        <Component {...extendedPageProps} />     
        <Footer />
      </div>
    </AnimatePresence>
    </Lenis>
  );
}
