import { CategoriesModel } from "../models";

export namespace Categories {
  export type Model = CategoriesModel[];
}

export interface Categories {
  getCategories(): Promise<Categories.Model>;
}
