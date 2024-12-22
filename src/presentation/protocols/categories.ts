export type CategoriesModel = {
  id: number;
  text: string;
  link: string;
};

export type CategoriesParams = {};

export namespace Categories {
  // export type Params = CategoriesParams;
  export type Model = CategoriesModel[];
}

export interface Categories {
  getCategories(): Promise<Categories.Model>;
}
