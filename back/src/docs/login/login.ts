export default {
  post: {
    tags: ['Authentication'],
    description: 'Log in to the system.',
    operationId: 'login',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test1@example.com',
              },
              password: {
                type: 'string',
                description: 'User password.',
                example: 'Secret1*',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successful Login.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Bienvenido!',
                },
                user: {
                  $ref: '#/components/schemas/UserData',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Bad request, email and/or password missing.',
      },
      401: {
        description: 'Unauthorized, wrong email and/or password.',
      },
    },
  },
};
