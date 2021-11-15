export default {
  get: {
    tags: ['Cart'],
    description: 'Get a list of all products in the cart.',
    operationId: 'getProductsCart',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id',
        },
        required: true,
        description: 'A single product id',
      },
    ],
    responses: {
      200: {
        description: 'Product in the cart was obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProductCart',
            },
          },
        },
      },
      404: {
        description:
          "The cart does not exists (there's no cart associated to the user) or the product is not in the cart.",
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized route, login first and try again',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
};
