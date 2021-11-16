export default {
  get: {
    tags: ['Cart'],
    description: 'Get a list of all products in the cart.',
    operationId: 'getProductsCart',
    parameters: [],
    responses: {
      200: {
        description: 'Products in the cart were obtained',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of products in cart.',
              items: {
                $ref: '#/components/schemas/ProductCart',
              },
            },
          },
        },
      },
      404: {
        description:
          "The cart does not exists (there's no cart associated to the user)",
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
