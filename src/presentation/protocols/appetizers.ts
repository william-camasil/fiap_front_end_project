export type AppetizersModel = {
  id: number;
  image: string;
  title: string;
  description: string;
  values: {
    small: number | null;
    large: number | null;
  };
};

export namespace Appetizers {
  export type Model = AppetizersModel[];
}

export interface Appetizers {
  getAppetizers(): Promise<Appetizers.Model>;
}
