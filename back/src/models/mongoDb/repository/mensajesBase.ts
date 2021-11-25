import mongoose from 'mongoose';

interface IReadWrite<T> {
  get(id?: string): Promise<T[]>;
  save(data: T): Promise<T>;
}

export abstract class BaseRepository<T> implements IReadWrite<T> {
  public readonly model: mongoose.Model<any>;

  constructor(
    collection: string,
    schema: mongoose.Schema<
      T,
      mongoose.Model<T, unknown, unknown>,
      Record<string, unknown>
    >,
  ) {
    this.model = mongoose.model<T>(collection, schema);
  }

  async get(id?: string): Promise<T[]> {
    if (id) return this.model.findById(id);
    return this.model.find({});
  }

  async save(data: T): Promise<T> {
    const saveModel = new this.model(data);
    return saveModel.save();
  }
}
