export default {
  get: {
    tags: ['User'],
    description: 'Get the logged in user data.',
    operationId: 'userData',
    parameters: [],
    responses: {
      200: {
        description: 'Logged in user data was obtained.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserData',
            },
          },
        },
      },
      404: {
        description: "There's no user logged in.",
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
