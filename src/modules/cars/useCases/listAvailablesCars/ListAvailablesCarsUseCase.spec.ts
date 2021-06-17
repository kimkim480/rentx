import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailablesCarsUseCase } from "./ListAvailablesCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailablesCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailablesCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
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
    const cars = await listCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    await carsRepositoryInMemory.create({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description",
      fine_amount: 60,
      license_plate: "ABC-1334",
      name: "Name 1",
    });
    const car = await carsRepositoryInMemory.findByLicensePlate("ABC-1334");
    const cars = await listCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    await carsRepositoryInMemory.create({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description",
      fine_amount: 60,
      license_plate: "ABC-1334",
      name: "Name 1",
    });
    const car = await carsRepositoryInMemory.findByLicensePlate("ABC-1334");
    const cars = await listCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description",
      fine_amount: 60,
      license_plate: "ABC-1334",
      name: "Name 1",
    });
    const car = await carsRepositoryInMemory.findByLicensePlate("ABC-1334");
    const cars = await listCarsUseCase.execute({ brand: car.brand });

    expect(cars).toEqual([car]);
  });
});
