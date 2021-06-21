import { getRepository, Repository } from "typeorm";
import { idText } from "typescript";

import { ICreateRentalDTO } from "@modules/rentals/dtos/IcreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    car_id,
    expected_return_date,
    user_id,
    total,
    end_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      expected_return_date,
      user_id,
      total,
      end_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id, end_date: null } });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { user_id, end_date: null },
    });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }
}
