import { Request, Response } from 'express';
import Config from 'config';
import { CartIsEmpty } from 'errors';
import { IItemCarrito } from 'common/interfaces/carrito';
import { carritoAPI } from 'api/carrito';
import { EmailService } from 'services/email';
import { SmsService } from 'services/twilio';
import { isEmpty, isProductPopulated } from 'utils/others';
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
    telefono,
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

    const orderToSave = {
      productos,
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

    SmsService.sendMessage(
      Config.ADMIN_WHATSAPP,
      `Nuevo pedido de: ${nombre}, ${email}`,
      'whatsapp',
    );

    SmsService.sendMessage(
      telefono,
      `Tu pedido ha sido recibido y está siendo procesado`,
      'sms',
    );

    await carritoAPI.delete(_id);

    res
      .location(`/api/ordenes/${newOrder.id}`)
      .status(201)
      .json({ data: newOrder });
  } else {
    throw new CartIsEmpty(404, 'El carrito está vacío');
  }
};
