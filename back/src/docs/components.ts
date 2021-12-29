export default {
  components: {
    schemas: {
      ProductId: {
        type: 'string',
        description: 'An id of a product',
        example: '61717f366466441a1936e9fa',
      },
      UserId: {
        type: 'string',
        description: 'An id of an user.',
        example: '6185584bc0d33bdb01a32966',
      },
      OrderId: {
        type: 'string',
        description: 'An id of an order.',
        example: '61a6bba3f5c7da3594512795',
      },
      User: {
        type: 'object',
        description: 'User data.',
        properties: {
          id: {
            type: 'string',
            description: 'User id.',
            example: '61855811efae7a5e849ebb9c',
          },
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@example.com',
          },
          nombre: {
            type: 'string',
            description: 'User name.',
            example: 'Jose Perez',
          },
          calle: {
            type: 'string',
            description: 'User address street.',
            example: 'Providencia',
          },
          altura: {
            type: 'string',
            description: 'User address street number.',
            example: '1550',
          },
          piso: {
            type: 'string',
            description: 'User address floor number, optional.',
            example: '1',
          },
          depto: {
            type: 'string',
            description: 'User address department number, optional.',
            example: '23',
          },
          codigoPostal: {
            type: 'string',
            description: 'User postal code.',
            example: '1234567',
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
            description: 'Path to where the user picture is stored.',
            example: 'uploads/foto-test1@example.com.png',
          },
          admin: {
            type: 'boolean',
            description: 'Determines if an user is admin or not.',
            example: false,
          },
        },
      },
      UserData: {
        type: 'object',
        description: 'Logged in user data.',
        properties: {
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@example.com',
          },
          nombre: {
            type: 'string',
            description: 'User name.',
            example: 'Jose Perez',
          },
          calle: {
            type: 'string',
            description: 'User address street.',
            example: 'Providencia',
          },
          altura: {
            type: 'string',
            description: 'User address street number.',
            example: '1550',
          },
          piso: {
            type: 'string',
            description: 'User address floor number, optional.',
            example: '1',
          },
          depto: {
            type: 'string',
            description: 'User address department number, optional.',
            example: '23',
          },
          codigoPostal: {
            type: 'string',
            description: 'User postal code.',
            example: '1234567',
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
            description: 'Path to where the user picture is sotraged.',
            example: 'uploads/foto-test1@example.com.png',
          },
          admin: {
            type: 'boolean',
            description: 'Determines if an user is admin or not.',
            example: false,
          },
        },
      },
      Product: {
        type: 'object',
        description: 'A product.',
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
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'Home',
          },
          fotos: {
            type: 'array',
            description: 'Product images urls',
            items: {
              type: 'string',
              example:
                'https://res.cloudinary.com/alais29/image/upload/v1639511210/Products/hbi9dqnu5u3mq3qxsb6y.jpg',
            },
          },
          fotosId: {
            type: 'array',
            description: 'Product images ids urls',
            items: {
              type: 'string',
              example: 'Products/hbi9dqnu5u3mq3qxsb6y',
            },
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
      ProductInputAdd: {
        type: 'object',
        description: 'Product data when saving a new product.',
        properties: {
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Test Product',
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
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'Games',
          },
          fotos: {
            type: 'array',
            description: 'Product images.',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      ProductInputEdit: {
        type: 'object',
        description: 'Product data when editing a product.',
        properties: {
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Test Product',
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
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'Games',
          },
          fotos: {
            type: 'string',
            description:
              'Stringified array of product images urls. If you need to remove an existing image from the product, the image url needs to be removed from this stringified array.',
            example:
              '["https://res.cloudinary.com/alais29/image/upload/v1639511210/Products/hbi9dqnu5u3mq3qxsb6y.jpg"]',
          },
          fotosId: {
            type: 'string',
            description:
              'Stringified array of product images ids. If you need to remove an existing image from the product, the image id needs to be removed from this stringified array',
            example: '["Products/hbi9dqnu5u3mq3qxsb6y"]',
          },
          newFotos: {
            type: 'array',
            description:
              'New product images if added. If no image is added then don\'t send the field (Uncheck "Send empty value" option)',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      ProductCart: {
        type: 'object',
        description: 'A product in the cart.',
        properties: {
          producto: {
            $ref: '#/components/schemas/Product',
          },
          quantity: {
            type: 'number',
            description: 'Amount of this product in the cart.',
            example: '1',
          },
        },
      },
      ProductOrder: {
        type: 'object',
        description: 'A product in an order.',
        properties: {
          producto: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                description: 'Product name',
                example: 'Test Product',
              },
              descripcion: {
                type: 'string',
                description: 'Product description',
                example:
                  'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
              },
              precio: {
                type: 'number',
                description: 'Product price',
                example: '123.4',
              },
              id: {
                $ref: '#/components/schemas/ProductId',
              },
            },
          },
          quantity: {
            type: 'number',
            description: 'Amount of this product in the order.',
            example: '1',
          },
        },
      },
      Order: {
        type: 'object',
        description: 'An Order.',
        properties: {
          user: {
            type: 'object',
            description: 'User id and email',
            properties: {
              id: {
                $ref: '#/components/schemas/UserId',
              },
              email: {
                type: 'string',
                description: 'Email of the user who created the order.',
                example: 'test1@example.com',
              },
            },
          },
          productos: {
            $ref: '#/components/schemas/ProductOrder',
          },
          total: {
            type: 'number',
            description: 'Total price of the order.',
            example: '1500',
          },
          estado: {
            type: 'string',
            description:
              'Order status, can be "generada" for generated but not completed orders, or "completada" for completed orders.',
            example: 'generada',
          },
          direccionEntrega: {
            type: 'string',
            description: 'Delivery Address.',
            example: 'Prueba 123, Piso 1, Depto. 121',
          },
          codigoPostal: {
            type: 'string',
            description: 'Postal code.',
            example: '12345678',
          },
          timestamp: {
            type: 'string',
            description: 'Date and time when the order was created.',
            example: '2021-12-01T00:02:43.013Z',
          },
          updatedAt: {
            type: 'string',
            description: 'Date and time when the order was last updated.',
            example: '2021-12-01T00:02:43.013Z',
          },
          id: {
            $ref: '#/components/schemas/OrderId',
          },
        },
      },
      Message: {
        type: 'object',
        description: 'A chat message.',
        properties: {
          user: {
            $ref: '#/components/schemas/User',
          },
          text: {
            type: 'string',
            description: 'Text in the message.',
            example: 'Hola',
          },
          type: {
            type: 'string',
            description:
              'Indicates if the message was sent by the user ("usuario") or by the system ("sistema").',
            example: 'sistema',
          },
          date: {
            type: 'string',
            description: 'Creation date of the message.',
            example: '2021-11-29T18:44:55.533Z',
          },
          id: {
            type: 'string',
            description: 'Message id.',
            example: '61a51fa72e460752431763bd',
          },
        },
      },
      Error: {
        type: 'object',
        description: 'Error structure.',
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
          descripcion: {
            type: 'string',
            description: 'Error description, can be present or not.',
            example: 'Faltan los siguientes campos: nombre',
          },
        },
      },
    },
  },
};
