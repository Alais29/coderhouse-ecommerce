import * as socketio from 'socket.io';
import * as http from 'http';
import { messagesAPI } from 'api/mensajes';
import { userAPI } from 'api/user';
import { logger } from './logger';
import { getMessageResponse } from 'utils/others';

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on('connection', async (socket: socketio.Socket) => {
    logger.info('Nueva conexión');

    socket.on('get messages', async (userEmail: string) => {
      try {
        const user = await userAPI.query(userEmail);
        const userMessages = await messagesAPI.get(user.id);
        socket.emit('messages', userMessages);
      } catch (e) {
        socket.emit('messages error', {
          error: e.error,
          message: e.message,
        });
      }
    });

    socket.on('new message', async newMessage => {
      try {
        const user = await userAPI.query(newMessage.email);
        await messagesAPI.save(user.id, newMessage.text, 'usuario');

        const response = await getMessageResponse(newMessage.text, user.id);
        await messagesAPI.save(user.id, response, 'sistema');

        const messagesList = await messagesAPI.get(user.id);
        socket.emit('new message saved', messagesList);
      } catch (e) {
        socket.emit('messages error', {
          error: e.error,
          message: e.message,
        });
      }
    });
  });
};
