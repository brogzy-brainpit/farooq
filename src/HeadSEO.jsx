import Head from 'next/head'
import React from 'react'

function HeadSEO() {
  return (
    <Head>
        <title>Carwash website Demo</title>

        <meta
          name="description"
          content="Premium mobile car detailing in Miami, FL. Interior and exterior cleaning that restores shine, comfort, and showroom-quality results. Book today."
        />

        <meta
          name="keywords"
          content="car detailing Miami, mobile car wash Miami, auto detailing Miami FL, interior car cleaning Miami, exterior car detailing Miami"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Mobile Car Detailing in Miami, FL" />
        <meta
          property="og:description"
          content="Restore your car to showroom condition with Shine Carwash Mobile. Professional interior & exterior detailing."
        />
        <meta property="og:image" content="http://res.cloudinary.com/brainpit/image/upload/v1775918888/vjmy1mrnjmnxeixuxhnq.png" />
        <meta property="og:url" content="https://shine-carwash-mobile.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shine Carwash Mobile" />
        <meta
          name="twitter:description"
          content="Expert mobile car detailing in Miami. Interior & exterior services that bring back your car’s shine."
        />
        <meta name="twitter:image" content="http://res.cloudinary.com/brainpit/image/upload/v1775918888/vjmy1mrnjmnxeixuxhnq.png" />

        {/* Geo */}
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Miami" />

        {/* JSON-LD (SEO BOOST) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoWash",
              name: "Shine Carwash Mobile",
              url: "https://shine-carwash-mobile.vercel.app/",
              image: "http://res.cloudinary.com/brainpit/image/upload/v1775918888/vjmy1mrnjmnxeixuxhnq.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "250 NE 25th St",
                addressLocality: "Miami",
                addressRegion: "FL",
                postalCode: "33137",
                addressCountry: "US",
              },
              areaServed: {
                "@type": "City",
                name: "Miami",
              },
              serviceType: [
                "Car Detailing",
                "Mobile Car Wash",
                "Interior Detailing",
                "Exterior Detailing"
              ],
              description:
                "Shine Carwash Mobile provides premium mobile car detailing services in Miami, Florida.",
            }),
          }}
        />
      </Head>
  )
}

export default HeadSEO