
export const name: string = 'Fernando';
export const lastName: string = 'Herrera';
export let age: number = 35;
let isActive: boolean = true;

export const templateString = ` Este es un string
con multiples líneas
que permite tener
"comillas dobles"
y 'comillas simples'
inyectando variables como ${name}
expressions: ${1 + 1}
numeros: ${age}
booleanos: ${isActive}`

console.log(templateString);