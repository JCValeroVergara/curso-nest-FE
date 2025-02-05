//Las entity son clases que representan las tablas de la base de datos (Modelo de datos) la clase es el nombre de la tabla y las propiedades son los campos de la tabla

export class Brand {

  id: string;
  name: string;

  createAt: number;
  updatedAt?: number;
}
