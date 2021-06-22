import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification", async () => {
    await carsRepositoryInMemory.create({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Name",
    });

    const car = await carsRepositoryInMemory.findByLicensePlate("ABC-1234");

    await specificationsRepositoryInMemory.create({
      name: "Name",
      description: "Description",
    });

    const specification = await specificationsRepositoryInMemory.findByName(
      "Name"
    );

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(car).toHaveProperty("specifications");
    expect(car.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a nonexistent car", async () => {
    const car_id = "123456";
    const specifications_id = ["123456789"];
    expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists"));
  });
});
