const post201 = {
  data: {
    type: "surveyAnswers",
    id: "9c7160a4-e9ad-499e-92f6-07d7cdb0382c",
    attributes: {
      answers: [
        {
          questionId: "film",
          answer: "Rocky Horror Picture Show",
        },
        {
          questionId: "review",
          answer: 5,
        },
      ],
    },
    relationships: {
      survey: {
        data: {
          type: "surveys",
          id: "2660dd24-e2db-42c1-8093-284b1df2664c",
        },
      },
    },
  },
};

const post422 = {
  errors: [
    {
      source: { pointer: "data/attributes/answers/film" },
      detail: "The value is required",
    },
    {
      source: { pointer: "data/attributes/answers/review" },
      detail: "The value is required",
    },
  ],
};

export default { post201, post422 };
