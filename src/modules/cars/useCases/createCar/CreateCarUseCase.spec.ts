import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Name",
    });

    const car = await carsRepositoryInMemory.findByLicensePlate("ABC-1234");

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with existing license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: "Brand",
        category_id: "category-id",
        daily_rate: 100,
        description: "Description",
        fine_amount: 60,
        license_plate: "ABC-1234",
        name: "Name 1",
      });

      await createCarUseCase.execute({
        brand: "Brand",
        category_id: "category-id",
        daily_rate: 100,
        description: "Description",
        fine_amount: 60,
        license_plate: "ABC-1234",
        name: "Name 2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    await createCarUseCase.execute({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Name",
    });

    const car = await carsRepositoryInMemory.findByLicensePlate("ABC-1234");

    expect(car.available).toBe(true);
  });
});
