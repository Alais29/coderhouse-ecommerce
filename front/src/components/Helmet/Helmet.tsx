import { Helmet as ReactHelmet } from 'react-helmet-async';

const Helmet = () => {
  return (
    <ReactHelmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://res.cloudinary.com/alais29/image/upload/v1640897578/favicon-16x16_kwxqj0.png"
      />
      <title>MERN Ecommerce</title>
      <meta name="author" content="Alfonsina Lizardo" />
      <meta
        name="description"
        content="A fullstack MERN ecommerce application"
      />
      <meta name="title" property="og:title" content="MERN Ecommerce" />
      <meta
        name="description"
        property="og:description"
        content="A fullstack MERN ecommerce application"
      />
      <meta
        name="image"
        property="og:image"
        content="https://res.cloudinary.com/alais29/image/upload/v1643209711/ogImage_ekmmnq.jpg"
      />
    </ReactHelmet>
  );
};

export default Helmet;
