import * as socketio from 'socket.io';
import * as http from 'http';
import { messagesAPI } from 'api/mensajes';
import { IMessage } from 'common/interfaces';
import { normalize, schema } from 'normalizr';
import util from 'util';

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on('connection', async (socket: socketio.Socket) => {
    console.log('Nueva conexión');

    try {
      const mensajes = ((await messagesAPI.get()) as IMessage[]).map(msg => ({
        id: msg._id,
        author: msg.author,
        text: msg.text,
        timestamp: msg.timestamp,
      }));

      const authorSchema = new schema.Entity('authors');
      const messageSchema = new schema.Entity('mensaje', {
        author: authorSchema,
      });
      const messagesSchema = new schema.Array(messageSchema);
      const normalizedData = normalize(mensajes, messagesSchema);

      socket.emit('messages', normalizedData);
    } catch (e) {
      socket.emit('messages error', {
        error: e.error,
        message: e.message,
      });
    }

    socket.on('new message', async newMessage => {
      messagesAPI
        .save(newMessage)
        .then(() => {
          socket.emit('save message success', null);
          messagesAPI
            .get()
            .then(messages => {
              const mensajes = (messages as IMessage[]).map(msg => ({
                id: msg._id,
                author: msg.author,
                text: msg.text,
                timestamp: msg.timestamp,
              }));

              const authorSchema = new schema.Entity('authors');
              const messageSchema = new schema.Entity('mensaje', {
                author: authorSchema,
              });
              const messagesSchema = new schema.Array(messageSchema);
              const normalizedData = normalize(mensajes, messagesSchema);
              io.emit('messages', normalizedData);
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
