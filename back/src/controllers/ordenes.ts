import { Request, Response } from 'express';
import Config from 'config';
import { CartIsEmpty } from 'errors';
import { IItem } from 'common/interfaces';
import { carritoAPI } from 'api/carrito';
import { EmailService } from 'services/email';
import { SmsService } from 'services/twilio';
import { isEmpty } from 'utils/others';

interface User {
  nombre?: string;
  email: string;
  telefono: string;
}

export const sendOrder = async (req: Request, res: Response): Promise<void> => {
  const { email, nombre, telefono } = req.user as User;
  const productos = (await carritoAPI.get(email)) as IItem[];

  if (!isEmpty(productos)) {
    let emailContent = '<h2>Productos</h2>';

    const total = productos.reduce((total, item) => (total += item.precio), 0);
    productos.forEach(item => {
      emailContent += `
          <span style="display: block">- ${item.nombre}, ${item.codigo}, $${item.precio} </span>
          `;
    });

    emailContent += `<h3>Total: $${total.toFixed(2)}</h3>`;

    EmailService.sendEmail(
      Config.GMAIL_EMAIL,
      `Nuevo pedido de: ${nombre}, ${email}`,
      emailContent,
    );

    SmsService.sendMessage(
      telefono,
      `Tu pedido ha sido recibido y está siendo procesado`,
    );

    await carritoAPI.delete(email);

    res.json({ data: 'Orden enviada con éxito' });
  } else {
    throw new CartIsEmpty(404, 'El carrito está vacío');
  }
};
