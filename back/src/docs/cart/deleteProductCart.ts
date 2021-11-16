export default {
  delete: {
    tags: ['Cart'],
    description: 'Delete a product in the cart.',
    operationId: 'deleteProductCart',
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
        description: 'Product was removed successfully from the cart.',
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
      404: {
        description:
          "The cart does not exists (there's no cart associated to the user) or the product you want to delete is not in the cart.",
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
