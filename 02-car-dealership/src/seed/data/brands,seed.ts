import { v4 as uuid } from 'uuid';
import { Brand } from 'src/brands/entities/brand.entity';



export const BRANDS_SEED: Brand [] = [
  {
    id: uuid(), 
    name: 'Toyota',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Honda',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Nissan',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Ford',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Chevrolet',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'BMW',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Mercedes-Benz',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Audi',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Lexus',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Kia',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Hyundai',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Mazda',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Subaru',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Volkswagen',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Volvo',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Porsche',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Jaguar',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Land Rover',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Mitsubishi',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Infiniti',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Acura',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(), 
    name: 'Buick',
    createAt: new Date().getTime(),
  },
];