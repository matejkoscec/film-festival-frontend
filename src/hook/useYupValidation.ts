import * as Yup from "yup";

import { SurveyResponse } from "../api/survey/types";

const yupTypes = {
  text: Yup.string(),
  rating: Yup.number(),
};

export default function useYupValidation(survey?: SurveyResponse) {
  if (!survey) return Yup.object().shape({});

  const validationShape = survey.data.attributes.questions.reduce((acc, question) => {
    const { questionId, questionType, required, attributes } = question;

    acc[questionId] = yupTypes[questionType as keyof typeof yupTypes];

    if (required) acc[questionId] = acc[questionId].required("This is a required field");

    if (attributes) {
      const { min, max } = attributes;

      if (min) acc[questionId] = acc[questionId].min(min as number);
      if (max) acc[questionId] = acc[questionId].max(max as number);
    }

    return acc;
  }, {} as { [key: string]: Yup.StringSchema | Yup.NumberSchema });

  return Yup.object().shape(validationShape);
}
