import survey, { MockedPath } from "../mock/survey/survey";
import { SurveyAnswersResponse } from "./survey/types";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export default class Client {
  private isMock: boolean;

  static Default = new Client(false);

  constructor(isMock: boolean) {
    this.isMock = isMock;
  }

  public async get(path: string, statusCode?: number) {
    return await this.performRequest("GET", path, undefined, statusCode);
  }

  public async post<T>(path: string, body: T, statusCode?: number) {
    return await this.performRequest<T>("POST", path, body, statusCode);
  }

  public async put<T>(path: string, body: T, statusCode?: number) {
    return await this.performRequest<T>("PUT", path, body, statusCode);
  }

  public async delete<T>(path: string, body: T, statusCode?: number) {
    return await this.performRequest<T>("DELETE", path, body, statusCode);
  }

  private async performRequest<T>(method: HttpMethod, path: string, body?: T, statusCode?: number) {
    if (this.isMock) {
      return await this.mockResponse(method, path, body, statusCode);
    }

    const response = await fetch(path, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    let res;
    try {
      res = await response.json();
    } catch (e) {
      // void response
    }
    if (!response.ok) throw new Error(res.message);

    return res;
  }

  private async mockResponse<T>(method: HttpMethod, path: string, body?: T, statusCode?: number) {
    if (!statusCode) return {};

    const surveyId = path.split("/")[path.split("/").length - 2];
    if (path.includes("/api/v1/survey/") && path.includes("/answers")) {
      path = "/api/v1/survey/{id}/answers";
    }

    let res;
    if (method === "GET") {
      res = survey.get(path as MockedPath, statusCode);
    }
    if (method === "POST") {
      res = survey.post(path as MockedPath, statusCode);

      if (statusCode === 201) {
        res = res as SurveyAnswersResponse;
        const answers = body
          ? Object.keys(body).map((key) => {
              return {
                questionId: key,
                answer: body[key as keyof T],
              };
            })
          : [];
        res = { ...res, data: { ...res.data, id: surveyId, attributes: { answers } } } as SurveyAnswersResponse;
      }
    }

    if (!(statusCode >= 200 && statusCode < 300)) throw new Error(JSON.stringify(res));

    return res;
  }
}
