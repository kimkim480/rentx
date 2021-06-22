import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUSeCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

const dayAdd24Hours = dayjs(dayjs().add(1, "day")).toDate();

describe("Create rental", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUSeCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a rental", async () => {
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

    const rental = await createRentalUSeCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental to an user with a rental in progress", async () => {
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

    await createRentalUSeCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUSeCase.execute({
        user_id: "12345",
        car_id: "123456789",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("there is a rental in progress for user"));
  });

  it("should not be able to create a rental to a car with a rental in progress", async () => {
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

    await createRentalUSeCase.execute({
      user_id: "12335",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUSeCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("car is unavailable"));
  });

  it("should not be able to create a rental with invalid rental time", async () => {
    await expect(
      createRentalUSeCase.execute({
        user_id: "12345",
        car_id: "121222",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("minimum rental time must be greater than 24 hours")
    );
  });
});
