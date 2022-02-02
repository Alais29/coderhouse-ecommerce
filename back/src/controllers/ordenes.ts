import { Request, Response } from 'express';
import Config from 'config';
import { CartIsEmpty } from 'errors';
import { IItemCarrito } from 'common/interfaces/carrito';
import { IItem } from 'common/interfaces/products';
import { carritoAPI } from 'api/carrito';
import { EmailService } from 'services/email';
// import { SmsService } from 'services/twilio';
import { isEmpty, isProductPopulated, isUserPopulated } from 'utils/others';
import { ordenesAPI } from 'api/ordenes';

interface User {
  _id: string;
  nombre?: string;
  email: string;
  telefono: string;
  calle: string;
  altura: string;
  codigoPostal: string;
  piso: string;
  depto: string;
}

export const createOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    _id,
    email,
    nombre,
    // telefono,
    calle,
    altura,
    codigoPostal,
    piso,
    depto,
  } = req.user as User;
  const productos = (await carritoAPI.get(_id)) as IItemCarrito[];

  if (!isEmpty(productos)) {
    const total = productos.reduce((total, item) => {
      if (isProductPopulated(item.producto))
        return (total += item.producto.precio * item.quantity);
      else return total;
    }, 0);

    const productosCopy = JSON.parse(JSON.stringify(productos));

    const orderToSave = {
      productos: productosCopy.map(
        (producto: { producto: IItem; quantity: number }) => ({
          producto: {
            id: producto.producto.id,
            nombre: producto.producto.nombre,
            descripcion: producto.producto.descripcion,
            precio: producto.producto.precio,
          },
          quantity: producto.quantity,
        }),
      ),
      estado: 'generada' as const,
      total,
      direccionEntrega: `${calle} ${altura}${piso ? `, Piso ${piso}` : ''}${
        depto ? `, Depto. ${depto}` : ''
      }`,
      codigoPostal,
    };

    const newOrder = await ordenesAPI.save(_id, orderToSave);

    let emailContent = '<h2>Productos</h2>';

    productos.forEach(item => {
      if (isProductPopulated(item.producto))
        emailContent += `
          <span style="display: block">- ${item.quantity} ${item.producto.nombre}, ${item.producto.codigo}, $${item.producto.precio} </span>
          `;
    });

    emailContent += `<h3>Total: $${total.toFixed(2)}</h3>`;

    EmailService.sendEmail(
      Config.GMAIL_EMAIL,
      `Nuevo pedido de: ${nombre}, ${email}`,
      emailContent,
    );

    // SmsService.sendMessage(
    //   Config.ADMIN_WHATSAPP,
    //   `Nuevo pedido de: ${nombre}, ${email}`,
    //   'whatsapp',
    // );

    // SmsService.sendMessage(
    //   telefono,
    //   `Tu pedido ha sido recibido y está siendo procesado`,
    //   'sms',
    // );

    await carritoAPI.delete(_id);

    res
      .location(`/api/ordenes/${newOrder.id}`)
      .status(201)
      .json({ data: newOrder });
  } else {
    throw new CartIsEmpty(404, 'El carrito está vacío');
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const orders = await ordenesAPI.get();
  res.json({ data: orders });
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as User;
  const orders = await ordenesAPI.get(_id);
  res.json({ data: orders });
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as User;
  const orders = await ordenesAPI.get(_id, req.params.id);
  res.json({ data: orders });
};

export const completeOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  let email = '';
  const completedOrder = await ordenesAPI.update(req.body.id);

  if (isUserPopulated(completedOrder.user)) email = completedOrder.user.email;

  const total = completedOrder.productos.reduce((total, item) => {
    return (total += item.producto.precio * item.quantity);
  }, 0);

  let emailContent = `
    <h2>Orden ${completedOrder.id}</h2>
    <h4>Productos:</h4>
  `;

  completedOrder.productos.forEach(item => {
    emailContent += `
        <span style="display: block">- ${item.quantity} ${item.producto.nombre}, $${item.producto.precio} </span>
        `;
  });

  emailContent += `<h3>Total: $${total.toFixed(2)}</h3>`;

  EmailService.sendEmail(
    email,
    `Orden completada: ${completedOrder.id}`,
    emailContent,
  );

  res.json({ data: completedOrder });
};
