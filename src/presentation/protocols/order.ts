export type OrderModel = {
  orderNumber: string;
  createdAt: string;
  message: string;
  details: object;
};

export type OrderParams = {
  items: [
    {
      title: string;
      value: number;
    }
  ];
  paymentOption: string;
};

export namespace Order {
  export type Params = OrderParams;
  export type Model = OrderModel;
}

export interface Order {
  order(params: Order.Params): Promise<Order.Model>;
}
