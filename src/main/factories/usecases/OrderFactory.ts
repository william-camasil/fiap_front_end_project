import { PostOrder } from "../../../data"
import { Order } from "../../../domain"
import { apiRoutes } from "../../routes/apiRoutes"
import { MakeApiUrl, MakeAxiosHttpClient } from "../http"

export const MakeOrder = (): Order => {
  return new PostOrder(
    MakeApiUrl(apiRoutes.order),
    MakeAxiosHttpClient<Order.Params, Order.Model>()
  )
}
