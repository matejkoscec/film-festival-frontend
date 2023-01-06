import surveryAnswersData from "./surveryAnswersData";
import surveyData from "./surveyData";

export type MockedPath = "/api/v1/survey" | "/api/v1/survey/{id}/answers";

function get(path: MockedPath, statusCode: number) {
  return mockResponse[path].GET[statusCode];
}

function post(path: MockedPath, statusCode: number) {
  return mockResponse[path].POST[statusCode];
}

type MockResponse = {
  [path: string]: {
    [method: string]: {
      [status: number]: unknown;
    };
  };
};

const mockResponse: MockResponse = {
  "/api/v1/survey": {
    GET: {
      200: surveyData.get200,
      500: surveyData.get500,
    },
  },
  "/api/v1/survey/{id}/answers": {
    POST: {
      201: surveryAnswersData.post201,
      422: surveryAnswersData.post422,
    },
  },
};

export default {
  get,
  post,
};
