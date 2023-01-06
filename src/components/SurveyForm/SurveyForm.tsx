import React from "react";

import { Form, useFormikContext } from "formik";
import parse from "html-react-parser";

import movieNightSvgSrc from "../../../assets/movie-night.svg";
import xSrc from "../../../assets/x.png";
import { ErrorResponse, SurveyResponse } from "../../api/survey/types";
import { SurveyFormType } from "../../pages/Index/Index";
import { firstLetterUppercase } from "../../util/text";
import ActionButton from "../ActionButton/ActionButton";
import FormikRadioGroup from "../Formik/FormikRadioGroup";
import FormikTextInput from "../Formik/FormikTextInput";

type SurveyFormProps = {
  survey: SurveyResponse;
  submitError?: ErrorResponse;
  className?: string;
};

export default function SurveyForm({ survey, submitError, className }: SurveyFormProps) {
  const { isSubmitting } = useFormikContext<SurveyFormType>();
  const { attributes } = survey.data;

  return (
    <Form className={`flex flex-col justify-center items-center relative ${className}`}>
      <img src={movieNightSvgSrc} alt="" className="w-96 absolute -top-52" />
      <h1 className="text-3xl font-semibold">{attributes.title}</h1>
      <div className="my-10 flex flex-col items-center">{parse(attributes.description)}</div>
      <div className="flex flex-col gap-6 w-full">
        {attributes.questions.map((question) => {
          const { questionId, questionType, label, attributes } = question;

          const inputProps = { name: questionId, label };

          if (questionType === "text") {
            return <FormikTextInput key={questionId} {...inputProps} />;
          }
          if (questionType === "rating") {
            return <FormikRadioGroup key={questionId} {...inputProps} attributes={attributes} />;
          }

          return <FormikTextInput key={questionId} {...inputProps} />;
        })}
      </div>
      {submitError && (
        <div className="mt-10 w-full border-red-200 border-2 rounded-lg py-4">
          <div className="font-semibold flex flex-row justify-center">
            <img src={xSrc} alt="x" className="h-6 w-6 mr-2" />
            There were errors in the submission:
          </div>
          <div className="text-red-500 flex flex-col items-center mt-2">
            {submitError.errors.map((err, index) => (
              <div key={index}>{`${firstLetterUppercase(err.source?.pointer.split("/").pop() || "")} - ${
                err.detail
              }`}</div>
            ))}
          </div>
        </div>
      )}
      <div className="w-full flex flex-row justify-end mt-10">
        <ActionButton type="submit" disabled={isSubmitting}>
          Submit
        </ActionButton>
      </div>
    </Form>
  );
}
