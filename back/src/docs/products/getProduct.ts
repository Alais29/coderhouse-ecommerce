export default {
  get: {
    tags: ['Products'],
    description: 'Get an specific product.',
    operationId: 'getProduct',
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
        description: 'Product was obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized route, login first and try again',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UnauthorizedRouteError',
            },
          },
        },
      },
      400: {
        description: 'The product does not exist.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NotFoundError',
            },
          },
        },
      },
    },
  },
};
