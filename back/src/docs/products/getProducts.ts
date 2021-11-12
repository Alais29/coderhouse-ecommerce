export default {
  get: {
    tags: ['Products'],
    description: 'Get a list of all products.',
    operationId: 'getProducts',
    parameters: [],
    responses: {
      200: {
        description: 'Products were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Products',
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
