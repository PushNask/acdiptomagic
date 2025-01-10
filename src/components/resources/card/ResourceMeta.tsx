import { Helmet } from 'react-helmet';

interface ResourceMetaProps {
  title: string;
  description: string;
  imageUrl: string | null;
  shareUrl: string;
}

const ResourceMeta = ({ title, description, imageUrl, shareUrl }: ResourceMetaProps) => {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:url" content={shareUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  );
};

export default ResourceMeta;