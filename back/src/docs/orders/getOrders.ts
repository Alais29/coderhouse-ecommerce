export default {
  get: {
    tags: ['Orders'],
    description: 'Get a list of the logged in customer orders.',
    operationId: 'getOrders',
    parameters: [],
    responses: {
      200: {
        description:
          'Orders were obtained. Can be an empty array if there are no orders',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of orders.',
              items: {
                $ref: '#/components/schemas/Order',
              },
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
