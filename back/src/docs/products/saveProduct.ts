export default {
  post: {
    tags: ['Products'],
    description: 'Save a new product.',
    operationId: 'saveProduct',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductInput',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Product created successfully.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      400: {
        description:
          'One or more of the product properties do not meet the proper conditions.',
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
