import { IUserBase, IUser } from 'common/interfaces/users';
import { UserModelFactory } from 'models/factory/user';
import { carritoAPI } from './carrito';
import { modelTypeToUse } from './modelType';

class UserAPI {
  private factory;

  constructor() {
    this.factory = UserModelFactory.model(modelTypeToUse);
  }

  async getUsers(id?: string): Promise<IUser[] | IUser> {
    if (id) return this.factory.get(id);
    return this.factory.get();
  }

  async addUser(userData: IUserBase): Promise<IUser> {
    const newUser = await this.factory.save(userData);
    await carritoAPI.createCart(newUser.id);
    return newUser;
  }

  async updateUser(id: string, userData: IUserBase) {
    const updatedUser = await this.factory.update(id, userData);
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.factory.delete(id);
    //TODO: Borrar carrito tambien
  }

  async query(email: string): Promise<IUser> {
    return this.factory.query(email);
  }
}

export const userAPI = new UserAPI();
