import { Helmet } from 'react-helmet-async';
export interface ISEOProps {
  title: string;
}

const description = 'Marvel Heroes List in React';
const type = 'summary_large_image';
const name = 'M-Heroes';
export const SEO = ({ title }: ISEOProps) => (
  <Helmet>
    {/* Standard metadata tags */}
    <title>{title}</title>
    <meta name='description' content={description} />
    {/* End standard metadata tags */}
    {/* Facebook tags */}
    <meta property='og:type' content={type} />
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />
    {/* <meta property='og:image' content={} /> */}
    <meta property='og:url' content={process.env.REACT_APP_DOMAIN} />
    {/* End Facebook tags */}

    <meta
      property='og:image'
      content={`${process.env.REACT_APP_DOMAIN}/thumbnail.jpg`}
    />
    <meta
      name='twitter:image'
      content={`${process.env.REACT_APP_DOMAIN}/thumbnail.jpg`}
    />

    <meta name='docsearch:language' content='en' />
    <meta name='docsearch:docusaurus_tag' content='default' />
    {/* Twitter tags */}
    <meta name='twitter:creator' content={name} />
    <meta name='twitter:card' content={type} />
    <meta name='twitter:title' content={title} />
    <meta name='twitter:description' content={description} />
    {/* End Twitter tags */}
  </Helmet>
);
