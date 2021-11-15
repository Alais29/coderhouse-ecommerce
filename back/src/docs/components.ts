export default {
  components: {
    schemas: {
      id: {
        type: 'string',
        description: 'An id of a product',
        example: '61717f366466441a1936e9fa',
      },
      Products: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Product identification id',
              example: '61717f366466441a1936e9fa',
            },
            nombre: {
              type: 'string',
              description: 'Product name',
              example: 'Tahini Paste',
            },
            descripcion: {
              type: 'string',
              description: 'Product description',
              example:
                'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
            },
            codigo: {
              type: 'string',
              description: 'Product code',
              example: 'ECOM-1234-1234',
            },
            precio: {
              type: 'number',
              description: 'Product price',
              example: '123.4',
            },
            foto: {
              type: 'string',
              description: 'Product image url',
              example: 'https://picsum.photos/300?random=3',
            },
            timestamp: {
              type: 'string',
              description: 'Product time and date of creation',
              example: '21/10/2021 11:54:40',
            },
            stock: {
              type: 'number',
              description: 'Product stock',
              example: '21',
            },
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Product identification id',
            example: '61717f366466441a1936e9fa',
          },
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Tahini Paste',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example:
              'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
          },
          codigo: {
            type: 'string',
            description: 'Product code',
            example: 'ECOM-1234-1234',
          },
          precio: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          foto: {
            type: 'string',
            description: 'Product image url',
            example: 'https://picsum.photos/300?random=3',
          },
          timestamp: {
            type: 'string',
            description: 'Product time and date of creation',
            example: '21/10/2021 11:54:40',
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      ProductInput: {
        type: 'object',
        properties: {
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Tahini Paste',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example:
              'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
          },
          codigo: {
            type: 'string',
            description: 'Product code',
            example: 'ECOM-1234-1234',
          },
          precio: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          foto: {
            type: 'string',
            description: 'Product image url',
            example: 'https://picsum.photos/300?random=3',
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      NotFoundError: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error internal code.',
            example: '-4',
          },
          name: {
            type: 'string',
            description: 'Name of the error class.',
            example: 'NotFound',
          },
          message: {
            type: 'string',
            description: 'Error message.',
            example: 'Producto no encontrado',
          },
          stack: {
            type: 'string',
            description: 'Error stack trace',
            example:
              'NotFound: Producto no encontrado\n    at new BaseError (/home/alizardo/Projects/coderhouse-ecommerce/back/src/errors/index.ts:13:11)\n    at new NotFound (/home/alizardo/Projects/coderhouse-ecommerce/back/src/errors/index.ts:36:5)\n    at ProductosModelMongoDb.<anonymous> (/home/alizardo/Projects/coderhouse-ecommerce/back/src/models/mongoDb/producto.ts:83:15)\n    at Generator.throw (<anonymous>)\n    at rejected (/home/alizardo/Projects/coderhouse-ecommerce/back/src/models/mongoDb/producto.ts:6:65)\n    at processTicksAndRejections (internal/process/task_queues.js:93:5)',
          },
        },
      },
      UnauthorizedRouteError: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error internal code.',
            example: '-1',
          },
          name: {
            type: 'string',
            description: 'Name of the error class.',
            example: 'UnauthorizedRoute',
          },
          message: {
            type: 'string',
            description: 'Error message.',
            example: 'No Autorizado',
          },
          stack: {
            type: 'string',
            description: 'Error stack trace',
            example:
              '"UnauthorizedRoute: No Autorizado\n    at new BaseError (/home/alizardo/Projects/coderhouse-ecommerce/back/src/errors/index.ts:13:11)\n    at new UnauthorizedRoute (/home/alizardo/Projects/coderhouse-ecommerce/back/src/errors/index.ts:61:5)\n    at isLoggedIn (/home/alizardo/Projects/coderhouse-ecommerce/back/src/middlewares/auth.ts:142:37)\n    at Layer.handle [as handle_request] (/home/alizardo/Projects/coderhouse-ecommerce/back/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/home/alizardo/Projects/coderhouse-ecommerce/back/node_modules/express/lib/router/index.js:317:13)\n    at /home/alizardo/Projects/coderhouse-ecommerce/back/node_modules/express/lib/router/index.js:284:7\n    at Function.process_params (/home/alizardo/Projects/coderhouse-ecommerce/back/node_modules/express/lib/router/index.js:335:12)\n    at next (/home/alizardo/Projects/coderhouse-ecommerce/back/node_modules/express/lib/router/index.js:275:10)\n    at Function.handle (/home/alizardo/Projects/coderhouse-ecommerce/back/node_modules/express/lib/router/index.js:174:3)\n    at router (/home/alizardo/Projects/coderhouse-ecommerce/back/node_modules/express/lib/router/index.js:47:12)',
          },
          descripcion: {
            type: 'string',
            description: 'Error description.',
            example: 'No tienes permisos para realizar esa acción',
          },
        },
      },
    },
  },
};
