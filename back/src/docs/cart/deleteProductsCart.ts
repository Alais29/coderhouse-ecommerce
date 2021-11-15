export default {
  delete: {
    tags: ['Cart'],
    description: 'Delete all products in the cart.',
    operationId: 'deleteProductsCart',
    parameters: [],
    responses: {
      200: {
        description: 'All products were removed successfully from the cart.',
      },
      404: {
        description:
          "The cart does not exists (there's no cart associated to the user).",
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
