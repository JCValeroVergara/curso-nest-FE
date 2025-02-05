
export class Pokemon {

  // public id: number = 1;
  // public name: string = 'No name';
  // // public type: string;
  // // public baseExperience: number;

  // constructor(id: number, name: string) {
  //   this.id = id;
  //   this.name = name;
  // }

  //Forma corta de declarar las propiedades de la clase
  constructor(
    public readonly id: number,
    public name: string,
  //   public type: string,
  //   public baseExperience: number
  ) {}
}

export const Pikachu = new Pokemon(1, 'Pikachu');
