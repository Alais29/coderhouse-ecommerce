export default {
  post: {
    tags: ['Authentication'],
    description: 'Sign up to the system (add a valid user).',
    operationId: 'signup',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test5@example.com',
              },
              password: {
                type: 'string',
                description:
                  'User password, must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
                example: 'Secret5*',
              },
              repeatPassword: {
                type: 'string',
                description:
                  'Password validation. Must be the same as password.',
                example: 'Secret5*',
              },
              nombre: {
                type: 'string',
                description: 'User name.',
                example: 'Jose Perez',
              },
              direccion: {
                type: 'string',
                description: 'User address.',
                example: 'Providencia 1550',
              },
              edad: {
                type: 'number',
                description: 'User age.',
                example: '30',
              },
              telefono: {
                type: 'string',
                description: 'User phone number, with international code.',
                example: '+56912345678',
              },
              foto: {
                type: 'string',
                description: 'User profile photo.',
                format: 'binary',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successful signup.',
      },
      400: {
        description: 'One of the fields values did not pass validation.',
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
