import { Helmet } from 'react-helmet';
import { DEFAULT_META, SITE_NAME, SITE_URL } from '../seo/defaultSeo';

function Seo({ title, description, canonicalPath = '/', keywords, noIndex = false }) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_META.title;
  const metaDescription = description || DEFAULT_META.description;
  const canonical = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords || DEFAULT_META.keywords} />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
}

export default Seo;
