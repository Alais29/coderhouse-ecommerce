export default {
  post: {
    tags: ['Orders'],
    description: 'Create an order from the products in the cart.',
    operationId: 'createOrder',
    parameters: [],
    responses: {
      200: {
        description: 'Order was created.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Order',
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
      500: {
        description: 'There was an issue when trying to create the order.',
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
