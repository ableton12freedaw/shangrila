import { Helmet } from "react-helmet-async";

const FALLBACK_SITE_URL = "https://school-connect-in-1.preview.emergentagent.com";
const OG_IMAGE_URL = "https://customer-assets.emergentagent.com/job_school-connect-in-1/artifacts/yfjw0b1u_1000046477.png";

const getSiteUrl = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return FALLBACK_SITE_URL;
};

export const SEOHead = ({ title, description, keywords, path = "/", schema = null }) => {
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE_URL} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />

      {schema ? (
        <script type="application/ld+json" data-testid="seo-schema-script">
          {JSON.stringify(schema)}
        </script>
      ) : null}
    </Helmet>
  );
};