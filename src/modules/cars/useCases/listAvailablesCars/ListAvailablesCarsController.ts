import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailablesCarsUseCase } from "./ListAvailablesCarsUseCase";

export class ListAvailablesCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;
    const listAvailablesCarsUseCase = container.resolve(
      ListAvailablesCarsUseCase
    );
    const cars = await listAvailablesCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.status(200).json(cars);
  }
}
