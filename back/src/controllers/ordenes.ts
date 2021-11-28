import { Request, Response } from 'express';
import Config from 'config';
import { CartIsEmpty } from 'errors';
import { IItemCarrito } from 'common/interfaces/carrito';
import { carritoAPI } from 'api/carrito';
import { EmailService } from 'services/email';
import { SmsService } from 'services/twilio';
import { isEmpty, isProductPopulated } from 'utils/others';

interface User {
  _id: string;
  nombre?: string;
  email: string;
  telefono: string;
}

export const sendOrder = async (req: Request, res: Response): Promise<void> => {
  const { _id, email, nombre, telefono } = req.user as User;
  const productos = (await carritoAPI.get(_id)) as IItemCarrito[];

  if (!isEmpty(productos)) {
    let emailContent = '<h2>Productos</h2>';

    const total = productos.reduce((total, item) => {
      if (isProductPopulated(item.producto))
        return (total += item.producto.precio * item.quantity);
      else return total;
    }, 0);
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

    res.json({ data: 'Orden enviada con éxito' });
  } else {
    throw new CartIsEmpty(404, 'El carrito está vacío');
  }
};
