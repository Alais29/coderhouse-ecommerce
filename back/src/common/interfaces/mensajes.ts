import { Types } from 'mongoose';

export interface IMessage {
  id?: string;
  user: Types.ObjectId;
  text: string;
  type: 'usuario' | 'sistema';
  date?: string;
}
