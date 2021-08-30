import * as socketio from 'socket.io';
import * as http from 'http';
import { messagesModel } from '/models/messagesSqlite';

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on('connection', async (socket: socketio.Socket) => {
    console.log('Nueva conexión');

    try {
      const messages = await messagesModel.get();
      socket.emit('messages', messages);
    } catch (e) {
      socket.emit('messages error', {
        error: e.error,
        message: e.message,
      });
    }

    socket.on('new message', async (newMessage) => {
      messagesModel
        .save(newMessage)
        .then(() => {
          socket.emit('save message success', null);
          messagesModel
            .get()
            .then((messages) => {
              io.emit('messages', messages);
            })
            .catch((e) => {
              socket.emit('messages error', {
                error: e.error,
                message: e.message,
              });
            });
        })
        .catch((e) => {
          socket.emit('save message error', {
            error: e.error,
            message: e.message,
          });
        });
    });
  });
};
