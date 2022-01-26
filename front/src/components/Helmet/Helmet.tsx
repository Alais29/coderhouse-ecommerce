import { Helmet as ReactHelmet } from 'react-helmet-async';

const Helmet = () => {
  return (
    <ReactHelmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1a4a4f" />
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
        content="A fullstack MERN ecommerce application built in Typescript. Includes several features such as login/signup, cart, orders, chat with websockets, among others."
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MERN Ecommerce" />
      <meta property="og:title" content="MERN Ecommerce" />
      <meta
        property="og:description"
        content="A fullstack MERN ecommerce application built in Typescript. Includes several features such as login/signup, cart, orders, chat with websockets, among others."
      />
      <meta
        property="og:url"
        content="https://mern-ecommerce-coder.herokuapp.com/#/"
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/alais29/image/upload/v1643209711/ogImage_ekmmnq.jpg"
      />
      <meta property="og:image:alt" content="Application homepage screenshot" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1048" />
      <meta property="og:image:height" content="936" />
      <meta name="twitter:card" content="summary_large_image" />
    </ReactHelmet>
  );
};

export default Helmet;
