export type SurveyResponse = {
  data: {
    type: string;
    id: string;
    attributes: {
      title: string;
      description: string;
      questions: {
        questionId: string;
        questionType: string;
        label: string;
        required: boolean;
        attributes:
          | null
          | {
              [key: string]: number | string;
            }[];
      }[];
    };
  };
};

export type ErrorResponse = {
  errors: {
    detail: string;
    title?: string;
    source?: {
      pointer: string;
    };
  }[];
};

export type SurveyAnswersResponse = {
  data: {
    type: string;
    id: string;
    attributes: {
      answers: {
        questionId: string;
        answer: string | number;
      }[];
    };
    relationships: {
      survey: {
        data: {
          type: string;
          id: string;
        };
      };
    };
  };
};
