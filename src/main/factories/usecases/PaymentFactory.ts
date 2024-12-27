import { GetPayment } from "../../../data";
import { Payment } from "../../../domain";
import { apiRoutes } from "../../routes/apiRoutes";
import { MakeApiUrl, MakeAxiosHttpClient } from "../http";

export const MakePayment = (): Payment => {
  return new GetPayment(
    MakeApiUrl(apiRoutes.payment),
    MakeAxiosHttpClient<{}, Payment.Model>()
  );
};
