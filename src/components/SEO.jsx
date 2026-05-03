import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, image }) => {
  const siteTitle = 'JDS Iron and Steels | Premium Gate & Steel Fabrication in Coimbatore';
  const siteDesc = 'Professional iron and steel fabrication products in Coimbatore with 20+ years experience. Specialist in modern gates, grills, and industrial sheds.';
  const siteKeywords = 'JDS Iron and Steels, Iron works in Coimbatore, Steel fabrication Tamil Nadu, Steel gate fabrication Coimbatore, Custom grills Coimbatore, Stainless Steel, Mild Steel';
  const siteUrl = 'https://jdsironandsteels.com'; // Placeholder URL

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | JDS Iron and Steels` : siteTitle}</title>
      <meta name="description" content={description || siteDesc} />
      <meta name="keywords" content={keywords || siteKeywords} />
      <link rel="canonical" href={url || siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title ? `${title} | JDS Iron and Steels` : siteTitle} />
      <meta property="og:description" content={description || siteDesc} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || siteUrl} />
      <meta name="twitter:title" content={title ? `${title} | JDS Iron and Steels` : siteTitle} />
      <meta name="twitter:description" content={description || siteDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
