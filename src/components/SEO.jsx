import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, image }) {
  const siteTitle = "RollDeck Studio | Premium Digital Agency";
  const defaultDescription = "RollDeck Studio engineers high-performance digital experiences that combine aesthetic rigor with technical excellence.";
  const defaultKeywords = "creative agency, web development, app development, UI/UX design, digital studio, React, Next.js, India";
  const defaultImage = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200"; // Placeholder OG image

  return (
    <Helmet>
      <title>{title ? `${title} | RollDeck Studio` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="theme-color" content="#ff5500" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} | RollDeck Studio` : siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title ? `${title} | RollDeck Studio` : siteTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
