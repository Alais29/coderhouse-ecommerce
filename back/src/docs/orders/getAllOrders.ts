export default {
  get: {
    tags: ['Orders'],
    description:
      'Get a list of all users orders. Only available to admin users.',
    operationId: 'getAllOrders',
    parameters: [],
    responses: {
      200: {
        description:
          'All orders were obtained. Can be an empty array if there are no orders',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of all orders.',
              items: {
                $ref: '#/components/schemas/Order',
              },
            },
          },
        },
      },
      401: {
        description:
          'Unauthorized route, login as an admin first and try again',
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
