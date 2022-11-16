<h1 align="center">Welcome to MERN Ecommerce 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://mern-ecommerce-wiyh.onrender.com/api-docs/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> A fullstack MERN ecommerce application with Typescript.

### ✨ [Demo](https://mern-ecommerce-wiyh.onrender.com/)
<sub>(Please bear in mind that the site will take a while to load since it's deployed on Render free tier, but it will load, just give it some time :wink:)</sub>

## Current Features

### Backend

- API Rest, on back folder, made with Node, Typescript, Express and Mongo, although the product routes are made to work with MySql, Sqlite, Firebase, file system and memory persistences as well (_hope to implement full functionality with all persistences in the future_)
- Passport local and express session with mongo store for authentication
- Express fileupload and cloudinary for images upload when creating and editing a product and when creating an user
- Jest and supertest for testing (_only products routes tests available for now_)
- Validation with Joi for user signup (_pending implementation on product creation_)
- Nodemailer and Twilio for sending emails, SMS and whatsapp messages
- Server can run on cluster mode for better performance
- Basic performance testing with Artillery
- Documentation made with Swagger
- Chat implementation with socket.io
- Logging with winston

### Frontend

- Typescript React app with Redux toolkit for state management
- Sass modules and Bootstrap for styling
- Images rendered with cloudinary package
- Fontawesome icons using its react package
- API calls with axios
- Automatic logout when idle
- Admin dashboard for adding users, products and completing orders
- Chat implemented with socket.io-client

## Future Features

- Routes for editing and deleting users
- Testing on frontend and testing for all other routes besides products on backend
- Full funcitonality with all persistances
- Option to specify the amount of a product when adding it to the cart
- Check product stock when adding/updating a product quantity in the cart and creating the order
- Edit product stock when creating an order
- Way for users to reset their passwords in case they forget it
- Option to see products by category on front
- Improve admin dashboard so the admin is able to add, delete and edit products from there
- Pagination in products page and to orders table on admin dashboard
- Form validation on frontend

## Install

Run this command both on back and front folder

```sh
npm install
```

## Usage

Create a .env file in the back folder with all the necessary variables (use .env.example file as an example).

You can run the whole project on development mode by going to the back folder and running:

```sh
npm run server:client
```

To run on production mode, run:

```sh
npm run build:start
```

However, if modifications are made to the frontend and you want those modifications to be seen on production mode, run this command first:

```sh
npm run build:ui
```

## Run tests

For now tests are only available in the backend and only for the products routes. To run those tests, go to the back folder and run:

```sh
npm run test
```

## Author

👤 **Alfonsina Lizardo**

- Website: https://alfonsinalizardo.netlify.app
- Github: [@alais29](https://github.com/alais29)
- LinkedIn: [@alfonsinalizardo](https://linkedin.com/in/alfonsinalizardo)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
