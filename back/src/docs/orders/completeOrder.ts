export default {
  put: {
    tags: ['Orders'],
    description:
      'Change an order "estado" property from "generada" to "completada" to complete the order.',
    operationId: 'completeOrder',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            typ: 'object',
            properties: {
              id: {
                $ref: '#/components/schemas/OrderId',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Order was updated.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Order',
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
      400: {
        description: "The order does not exists or it's already completed.",
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
