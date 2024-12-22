import {
  BadRequestError,
  Categories,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  PreconditionFailedError,
  UnauthorizedError,
  UnprocessableEntityError,
} from "../../domain";
import { HttpClient, HttpStatusCode } from "../protocols";

export class GetCategories implements Categories {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<// Categories.Params,
    Categories.Model>
  ) {}

  // async getCategories(params: Categories.Params): Promise<Categories.Model> {
  async getCategories(): Promise<Categories.Model> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}`,
      method: "get",
      // body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.Ok:
        return httpResponse.body as Categories.Model;
      case HttpStatusCode.Forbidden:
        throw new ForbiddenError();
      case HttpStatusCode.PreconditionFailed:
        throw new PreconditionFailedError();
      case HttpStatusCode.UnprocessableEntity:
        throw new UnprocessableEntityError();
      case HttpStatusCode.BadRequest:
        throw new BadRequestError();
      case HttpStatusCode.Unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.NotFound:
        throw new NotFoundError();
      default:
        throw new InternalServerError();
    }
  }
}
