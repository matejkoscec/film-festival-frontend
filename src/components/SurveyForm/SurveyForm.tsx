import React from "react";

import { Form } from "formik";
import parse from "html-react-parser";

import { ErrorResponse, SurveyResponse } from "../../api/survey/types";
import ActionButton from "../ActionButton/ActionButton";
import FormikRadioGroup from "../Formik/FormikRadioGroup";
import FormikTextInput from "../Formik/FormikTextInput";

type SurveyFormProps = {
  survey: SurveyResponse;
  submitError?: ErrorResponse;
};

export default function SurveyForm({ survey, submitError }: SurveyFormProps) {
  const { attributes } = survey.data;

  return (
    <Form className="">
      <h1>{attributes.title}</h1>
      <div>{parse(attributes.description)}</div>
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
      {submitError && (
        <>
          <div>There were errors in the submission:</div>
          <div className="text-red-500 flex flex-col">
            {submitError.errors.map((err, index) => (
              <div key={index}>{`${err.source?.pointer.split("/").pop()} - ${err.detail}`}</div>
            ))}
          </div>
        </>
      )}
      <ActionButton type="submit">Submit</ActionButton>
    </Form>
  );
}
