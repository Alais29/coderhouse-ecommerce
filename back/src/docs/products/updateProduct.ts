export default {
  put: {
    tags: ['Products'],
    description:
      'Update an existing product, only available for logged in admin user.',
    operationId: 'updateProduct',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/ProductId',
        },
        required: true,
        description: 'A single product id',
      },
    ],
    requestBody: {
      required: 'true',
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/components/schemas/ProductInputEdit',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Product updated successfully.',
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
      404: {
        description: 'The product to update does not exist.',
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
