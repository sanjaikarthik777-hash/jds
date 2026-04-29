import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, image }) => {
  const siteTitle = 'Velmurugan Grill Works | Best Grill & Fabrication in Coimbatore';
  const siteDesc = 'Professional grill works and fabrication services in Coimbatore with 10+ years experience. Contact us for gates, railings, and custom metal work.';
  const siteKeywords = 'Grill works in Coimbatore, Fabrication services Tamil Nadu, Steel gate fabrication Coimbatore, Custom grills Coimbatore, Stainless Steel, Mild Steel';
  const siteUrl = 'https://velmurugangrillworks.netlify.app';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | Velmurugan Grill Works` : siteTitle}</title>
      <meta name="description" content={description || siteDesc} />
      <meta name="keywords" content={keywords || siteKeywords} />
      <link rel="canonical" href={url || siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title ? `${title} | Velmurugan Grill Works` : siteTitle} />
      <meta property="og:description" content={description || siteDesc} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || siteUrl} />
      <meta name="twitter:title" content={title ? `${title} | Velmurugan Grill Works` : siteTitle} />
      <meta name="twitter:description" content={description || siteDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
