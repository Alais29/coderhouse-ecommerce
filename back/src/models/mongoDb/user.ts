import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserBase } from 'common/interfaces/users';
import { NotFound } from 'errors';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  calle: { type: String, required: true },
  altura: { type: String, required: true },
  codigoPostal: { type: String, required: true },
  piso: { type: String },
  depto: { type: String },
  edad: { type: Number, required: true },
  telefono: { type: String, required: true },
  foto: { type: String, required: true },
  fotoId: { type: String, required: true },
  admin: { type: Boolean, default: false },
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
    delete returnedObject.password;
  },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);

export class UserModelMongoDb {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  async get(id?: string): Promise<IUser[] | IUser> {
    let output: IUser[] | IUser = [];
    try {
      if (id) {
        const document = await this.userModel.findById(id);
        if (document !== null) output = document;
        else throw new NotFound(404, 'Usuario no encontrado');
      } else {
        output = await this.userModel.find();
      }
      return output;
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else if (e instanceof mongoose.Error.CastError) {
        throw new NotFound(404, 'Usuario no encontrado');
      } else {
        throw {
          error: e,
          message: 'Hubo un problema al cargar el/los usuarios',
        };
      }
    }
  }

  async save(userData: IUserBase): Promise<IUser> {
    const newUser = new this.userModel(userData);
    await newUser.save();
    return newUser;
  }

  async update(id: string, data: IUserBase): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async query(email: string): Promise<IUser> {
    const result = await this.userModel.find({ email });
    return result[0];
  }
}
