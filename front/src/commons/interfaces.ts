export interface IItem {
  id?: string
  nombre: string
  descripcion: string
  codigo: string
  precio: string
  foto: string
  timestamp?: string
  stock: string
}

export interface IAlert {
  show: boolean;
  text: string;
}
