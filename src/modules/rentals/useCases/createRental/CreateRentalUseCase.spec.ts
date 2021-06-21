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
    const rental = await createRentalUSeCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental to an user with a rental in progress", () => {
    expect(async () => {
      await createRentalUSeCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      });

      const rental = await createRentalUSeCase.execute({
        user_id: "12345",
        car_id: "121222",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental to a car with a rental in progress", () => {
    expect(async () => {
      await createRentalUSeCase.execute({
        user_id: "12335",
        car_id: "121222",
        expected_return_date: dayAdd24Hours,
      });

      const rental = await createRentalUSeCase.execute({
        user_id: "12345",
        car_id: "121222",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with invalid rental time", () => {
    expect(async () => {
      await createRentalUSeCase.execute({
        user_id: "12345",
        car_id: "121222",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
