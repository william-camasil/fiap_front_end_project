import { PostOrder } from "../../../data";
import { Order } from "../../../domain";
import { apiRoutes } from "../../routes/apiRoutes";
import { MakeAuthHttpClientDecorator } from "../decorators/authHttpClientDecoratorFactory";
import { MakeApiUrl } from "../http";

export const MakeOrder = (): Order => {
  return new PostOrder(
    MakeApiUrl(apiRoutes.order),
    MakeAuthHttpClientDecorator<Order.Params, Order.Model>()
  );
};
