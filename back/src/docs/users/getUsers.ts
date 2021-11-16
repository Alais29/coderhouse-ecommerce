export default {
  get: {
    tags: ['User'],
    description:
      'Get a list of all users. Only available for logged in admin user',
    operationId: 'getUsers',
    parameters: [],
    responses: {
      200: {
        description: 'Users were obtained.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of products.',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
      401: {
        description:
          'Unauthorized route, login as an admin first and try again.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      404: {
        description: 'There are no registered users.',
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
