import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListAvailablesCarsUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}
  async execute(data?: IRequest): Promise<Car[]> {
    return this.carsRepository.findAvailable(
      data?.brand,
      data?.category_id,
      data?.name
    );
  }
}
