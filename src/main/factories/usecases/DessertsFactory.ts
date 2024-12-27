import { GetDesserts } from "../../../data";
import { Desserts } from "../../../domain";
import { apiRoutes } from "../../routes/apiRoutes";
import { MakeApiUrl, MakeAxiosHttpClient } from "../http";

export const MakeDesserts = (): Desserts => {
  return new GetDesserts(
    MakeApiUrl(apiRoutes.desserts),
    MakeAxiosHttpClient<{}, Desserts.Model>()
  );
};
