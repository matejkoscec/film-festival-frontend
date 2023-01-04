export default {
  survey: {
    get: "/api/v1/survey",
    answers: (id: string | number) => `/api/v1/survey/${id}/answers`,
  },
};
