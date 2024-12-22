import { GetHamburgers } from "../../../data";
import { Hamburgers } from "../../../domain";
import { apiRoutes } from "../../routes/apiRoutes";
import { MakeApiUrl, MakeAxiosHttpClient } from "../http";

export const MakeHamburgers = (): Hamburgers => {
  return new GetHamburgers(
    MakeApiUrl(apiRoutes.hamburgers),
    MakeAxiosHttpClient<{}, Hamburgers.Model>()
  );
};
