export interface IObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IKnex {
  [key: string]: {
    client: string,
    connection: {
      host?: string,
      user?: string,
      password?: string,
      database?: string,
      filename?: string
    },
    migrations?: {
      directory: string,
    },
    seeds?: {
      directory: string,
    },
    pool?: {
      min?: number,
      max?: number
    },
    useNullAsDefault?: boolean
  },
}

export interface IItem extends IObject {
  id: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  precio: number;
  foto: string;
  timestamp: string;
  stock: number;
}

export interface IMesssage {
  email: string
  text: string
}