import { buildSchema } from 'graphql';
import {
  getProductos,
  getProducto,
  saveProducto,
} from 'controllers/productoGraphql';

export const graphqlSchema = buildSchema(`
  type Query {
    getProductos: [Item]
    getProducto(id: String!): Item
  }
  type Mutation {
    saveProducto(producto: ItemBase!): Item
  }
  input ItemBase {
    nombre: String!
    descripcion: String!
    codigo: String!
    precio: String!
    foto: String!
    stock: String!
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

export const graphqlRoot = {
  getProductos,
  getProducto,
  saveProducto,
};

// type Mutation {
//     saveProducto(producto: ItemBase!): Item
//   }
//   type ItemBase {
//     nombre: String
//     descripcion: String
//     codigo: String
//     precio: String
//     foto: String
//     stock: String
//   }
