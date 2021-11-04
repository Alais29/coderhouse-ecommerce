import * as socketio from 'socket.io';
import * as http from 'http';
import { messagesAPI } from 'api/mensajes';
import { SmsService } from './twilio';
import { logger } from '/utils/logger';

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on('connection', async (socket: socketio.Socket) => {
    logger.info('Nueva conexión');

    try {
      const mensajes = await messagesAPI.get();

      socket.emit('messages', mensajes);
    } catch (e) {
      socket.emit('messages error', {
        error: e.error,
        message: e.message,
      });
    }

    socket.on('new message', async newMessage => {
      if (newMessage.text.toLowerCase().includes('administrador')) {
        SmsService.sendMessage(
          '+56973413854',
          `Mensaje: ${newMessage.text}, Remitente: ${newMessage.email}`,
        );
      }
      messagesAPI
        .save(newMessage)
        .then(() => {
          socket.emit('save message success', null);
          messagesAPI
            .get()
            .then(messages => {
              io.emit('messages', messages);
            })
            .catch(e => {
              socket.emit('messages error', {
                error: e.error,
                message: e.message,
              });
            });
        })
        .catch(e => {
          socket.emit('save message error', {
            error: e.error,
            message: e.message,
          });
        });
    });
  });
};
