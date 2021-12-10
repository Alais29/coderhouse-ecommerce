import { IsNotEmpty, IsNumber, IsUrl, Length, Max } from 'class-validator';

export class ProductoDTO {
  readonly id: string;

  @IsNotEmpty()
  readonly nombre: string;

  @IsNotEmpty()
  readonly descripcion: string;

  @IsNotEmpty()
  @Length(14, 14)
  readonly codigo: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(5000)
  readonly precio: number;

  @IsNotEmpty()
  readonly categoria: string;

  @IsNotEmpty()
  @IsUrl()
  readonly foto: string;

  readonly timestamp: string;

  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;
}
