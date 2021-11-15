export default {
  put: {
    tags: ['Cart'],
    description: 'Update a product quantity in the cart.',
    operationId: 'updateProductCart',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductCartEdit',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Product amount in cart was updated.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProductsCart',
            },
          },
        },
      },
      404: {
        description:
          "The cart does not exists (there's no cart associated to the user), the product you want to edit is not in the cart, or the productId or amount are not valid.",
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
