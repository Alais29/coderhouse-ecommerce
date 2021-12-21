export default {
  post: {
    tags: ['Products'],
    description: 'Save a new product, only available for logged in admin user.',
    operationId: 'saveProduct',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/components/schemas/ProductInputAdd',
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
