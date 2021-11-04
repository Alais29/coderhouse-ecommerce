import { Request, Response } from 'express';
import Config from 'config';
import { CarritoModel } from 'models/mongoDb/carrito';
import { EmailService } from 'services/email';
import { IItem } from 'common/interfaces';
import { carritoAPI } from 'api/carrito';

interface User {
  cart?: string;
  nombre?: string;
  email: string;
}

export const sendOrder = async (req: Request, res: Response): Promise<void> => {
  const { email, nombre } = req.user as User;
  const productos = (await carritoAPI.get(email)) as IItem[];

  let emailContent = '<h2>Productos</h2>';

  const total = productos.reduce((total, item) => (total += item.precio), 0);
  productos.forEach(item => {
    emailContent += `
        <span style="display: block">- ${item.nombre}, ${item.codigo}, $${item.precio} </span>
        `;
  });

  emailContent += `<h3>Total: $${total}</h3>`;

  EmailService.sendEmail(
    Config.GMAIL_EMAIL,
    `Nuevo pedido de: ${nombre}, ${email}`,
    emailContent,
  );

  await carritoAPI.delete(email);

  res.json({ data: 'Orden enviada con éxito' });
};
