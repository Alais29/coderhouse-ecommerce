export default {
  post: {
    tags: ['Cart'],
    description: 'Add a product to the cart.',
    operationId: 'saveProductCart',
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
    responses: {
      200: {
        description: 'Product was added to cart.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of products in cart.',
              items: {
                $ref: '#/components/schemas/ProductCart',
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
      404: {
        description: 'The cart or the product you want to add does not exists.',
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
