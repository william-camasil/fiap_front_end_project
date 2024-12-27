import { GetBeverages } from "../../../data";
import { Beverages } from "../../../domain";
import { apiRoutes } from "../../routes/apiRoutes";
import { MakeApiUrl, MakeAxiosHttpClient } from "../http";

export const MakeBeverages = (): Beverages => {
  return new GetBeverages(
    MakeApiUrl(apiRoutes.beverages),
    MakeAxiosHttpClient<{}, Beverages.Model>()
  );
};
