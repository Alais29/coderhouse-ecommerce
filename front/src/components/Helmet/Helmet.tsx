import { Helmet as ReactHelmet } from 'react-helmet';
import ogImage from 'images/ogImage.jpg';

const Helmet = () => {
  return (
    <ReactHelmet>
      <meta charSet="utf-8" />
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
      <meta name="image" property="og:image" content={ogImage} />
    </ReactHelmet>
  );
};

export default Helmet;
