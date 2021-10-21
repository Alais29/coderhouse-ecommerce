import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from 'common/interfaces';

const Schema = mongoose.Schema;

//TODO: Add photo to schema, Add unique validation for email
const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  edad: { type: Number, required: true },
  telefono: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const UserModel = mongoose.model<IUser>('user', UserSchema);
