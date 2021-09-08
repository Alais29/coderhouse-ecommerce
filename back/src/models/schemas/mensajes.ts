import mongoose from 'mongoose';

const mensajesCollection = 'mensajes';

const MensajeSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 100 },
  text: { type: String, require: true },
});

export const mensajes = mongoose.model(mensajesCollection, MensajeSchema);