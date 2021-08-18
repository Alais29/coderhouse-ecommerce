export interface IItem {
  nombre: string
  descripcion: string
  codigo: string
  precio: string
  foto: string
  stock: string
}

export interface IItemAPI extends IItem {
  id: string
  timestamp: string
}

export interface IAlert {
  show: boolean;
  text: string;
  type?: 'success' | 'danger' | 'warning' | ''
}

export interface IToastInfo {
  type: '' | 'success' | 'warning' | 'danger'
  text: string
}