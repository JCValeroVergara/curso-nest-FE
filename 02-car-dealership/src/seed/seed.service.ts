import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands,seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,
    private readonly brandsSeed: BrandsService
  ) {}

  pupulateDB() {

    // CARS_SEED
    // BRANDS_SEED
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsSeed.fillBrandsWithSeedData(BRANDS_SEED);

    // return CARS_SEED;

    return 'SEED executed successfully!';
  }
}
