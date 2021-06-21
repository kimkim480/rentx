export interface ICreateRentalDTO {
  id?: string;
  user_id: string;
  car_id: string;
  total?: number;
  end_date?: Date;
  expected_return_date: Date;
}
