import { carritoAPI } from 'api/carrito';
import { ordenesAPI } from 'api/ordenes';
import { productsAPI } from 'api/productos';
import { IItemCarrito } from 'common/interfaces/carrito';
import { IOrder } from 'common/interfaces/ordenes';
import { IItem } from 'common/interfaces/products';
import { IUser } from 'common/interfaces/users';
import { Types } from 'mongoose';

/**
 * Determines if the item passed as argument is empty or not
 * @param item string, number, array, or object
 * @returns true if item is empty, false if it's not
 */
export const isEmpty = (item: string | number | unknown): boolean => {
  switch (typeof item) {
    case 'string':
      if (item !== '' && item !== 'null' && item !== 'undefined') {
        return false;
      }
      return true;
    case 'number':
      return false;
    case 'object':
      if (JSON.stringify(item) === '{}' || JSON.stringify(item) === '[]') {
        return true;
      }
      return false;
  }
  return true;
};

/**
 * TS type guard to check if product property from cart products is populated
 * @param obj object of type IItem or Types.ObjectId
 * @returns boolean
 */
export const isProductPopulated = (
  obj: IItem | Types.ObjectId,
): obj is IItem => {
  return (obj as IItem).nombre !== undefined;
};

/**
 * TS type guard to check if user property from orders is populated
 * @param obj object of type IUser or Types.ObjectId
 * @returns boolean
 */
export const isUserPopulated = (obj: IUser | Types.ObjectId): obj is IUser => {
  return (obj as IUser).email !== undefined;
};

/**
 * Returns a proper response message depending on the user input
 * @param message string, the message sent by the user
 * @param userId string, id of the user who sent the message
 * @returns string
 */
export const getMessageResponse = async (
  message: string,
  userId: string,
): Promise<string> => {
  switch (message.toLowerCase()) {
    case 'stock': {
      const productos = (await productsAPI.get()) as IItem[];
      const stock = productos.reduce(
        (stock: Record<string, unknown>, item: IItem) => {
          return {
            ...stock,
            [item.nombre]: item.stock,
          };
        },
        {},
      );

      let message = '';

      Object.entries(stock).forEach(item => {
        message += `- ${item[0]}: ${item[1]}.$nl`;
      });

      return message;
    }
    case 'orden': {
      const orders = (await ordenesAPI.get(userId)) as IOrder[];
      let message = '';
      if (isEmpty(orders)) {
        message = 'No tienes ordenes recientes.';
      } else {
        const lastOrder = orders[orders.length - 1];
        message = `Tu última orden (ID: ${lastOrder.id}), se encuentra ${
          lastOrder.estado === 'generada' ? 'en curso' : 'completada'
        } y ${
          lastOrder.estado === 'generada' ? 'será entregada' : 'fue entregada'
        } en ${
          lastOrder.direccionEntrega
        }. Los productos incluidos en la orden son: $nl`;
        lastOrder.productos.map(item => {
          message += `- Cantidad: ${item.quantity}, Producto: ${item.producto.nombre}, Precio: $${item.producto.precio} c/u.$nl`;
        });
        message += `Total: $${lastOrder.total}.$nl`;
      }
      return message;
    }
    case 'carrito': {
      const carrito = (await carritoAPI.get(userId)) as IItemCarrito[];
      let message = '';

      if (carrito.length === 0) {
        message = 'Tu carrito está vacío.';
      } else {
        const total = carrito.reduce((total, item) => {
          if (isProductPopulated(item.producto))
            return (total += item.producto.precio * item.quantity);
          else return total;
        }, 0);

        carrito.forEach(item => {
          if (isProductPopulated(item.producto))
            message += `- Cantidad: ${item.quantity}, Producto: ${item.producto.nombre}, Precio: $${item.producto.precio} c/u.$nl`;
        });

        message += `Total: $${total.toFixed(2)}.`;
      }

      return message;
    }
    default:
      return `
        Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones:$nl
          - Stock: Para conocer nuestro stock actual.$nl
          - Orden: Para concer la información de tu última orden.$nl
          - Carrito: Para conocer el estado de tu carrito.$nl
      `;
  }
};
