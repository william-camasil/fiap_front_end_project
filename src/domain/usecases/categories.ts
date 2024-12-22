import { CategoriesModel } from "../models";

export namespace Categories {
  // export type Params = CategoriesParams;
  export type Model = CategoriesModel[];
}

export interface Categories {
  // getCategories(params: Categories.Params): Promise<Categories.Model>;
  getCategories(): Promise<Categories.Model>;
}
