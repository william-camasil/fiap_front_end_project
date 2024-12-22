import { AppetizersModel } from "../models";

export namespace Appetizers {
  export type Model = AppetizersModel[];
}

export interface Appetizers {
  getAppetizers(): Promise<Appetizers.Model>;
}
