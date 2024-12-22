export type HamburgersModel = {
  id: number;
  image: Array<string>;
  title: string;
  description: string;
  values: {
    single: number;
    combo: number;
  };
};
