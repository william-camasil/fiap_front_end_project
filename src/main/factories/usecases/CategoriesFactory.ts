import { GetCategories } from "../../../data"
import { Categories } from "../../../domain"
import { apiRoutes } from "../../routes/apiRoutes"
import { MakeApiUrl, MakeAxiosHttpClient } from "../http"

export const MakeCategories = (): Categories => {
  return new GetCategories(
    MakeApiUrl(apiRoutes.categories),
    MakeAxiosHttpClient<{}, Categories.Model>()
  )
}
