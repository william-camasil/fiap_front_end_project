import { OrderModel, OrderParams } from "../models";

export namespace Order {
  export type Params = OrderParams;
  export type Model = OrderModel;
}

export interface Order {
  auth(params: Order.Params): Promise<Order.Model>;
}
