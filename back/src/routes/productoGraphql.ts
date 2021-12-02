import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import {
  getProducto,
  getProductos,
  saveProducto,
  updateProducto,
  deleteProducto,
} from 'controllers/productoGraphql';
import { IItem, IItemBase } from 'common/interfaces/products';

const rootResolver = {
  getProductos,
  getProducto: (id: string) => getProducto(id as unknown as { id: string }),
  saveProducto: (producto: IItemBase) =>
    saveProducto(producto as unknown as { producto: IItemBase }),
  updateProducto: (data: { id: string; producto: IItem }) =>
    updateProducto(data),
  deleteProducto: (id: string) =>
    deleteProducto(id as unknown as { id: string }),
};

const graphqlSchema = buildSchema(`
  type Query {
    getProductos: [Item]
    getProducto(id: String!): Item
  }
  type Mutation {
    saveProducto(producto: ItemBase!): Item
    updateProducto(id: String!, producto: ItemUpdate!): Item
    deleteProducto(id: String!): String!
  }
  input ItemBase {
    nombre: String!
    descripcion: String!
    codigo: String!
    precio: String!
    foto: String!
    stock: String!
  }
  input ItemUpdate {
    _id: String
    nombre: String
    descripcion: String
    codigo: String
    precio: String
    foto: String
    stock: String
    timestamp: String
  }
  type Item {
    _id: String
    nombre: String
    descripcion: String
    codigo: String
    precio: String
    foto: String
    stock: String
    timestamp: String
  }
`);

export const productoRouterGraphQL = graphqlHTTP({
  schema: graphqlSchema,
  rootValue: rootResolver,
  graphiql: true,
});
