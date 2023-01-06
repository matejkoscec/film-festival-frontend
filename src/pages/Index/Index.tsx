import React from "react";

import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import paths from "../../api/paths";
import { ErrorResponse, SurveyResponse } from "../../api/survey/types";
import { useClient } from "../../components/ClientProvider/ClientProvider";
import Loading from "../../components/Fallback/Loading";
import LoadingError from "../../components/Fallback/LoadingError";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import useYupValidation from "../../hook/useYupValidation";

type Form = {
  [key: string]: string;
};

const useInitialValues = (survey: SurveyResponse | undefined): Form => {
  return survey
    ? survey.data.attributes.questions.reduce(
        (acc, question) => ({
          ...acc,
          [question.questionId]: question.questionType === "rating" ? question.attributes?.["min"] : "",
        }),
        {}
      )
    : {};
};

export default function Index() {
  const { client } = useClient();
  const navigate = useNavigate();

  const [survey, setSurvey] = React.useState<SurveyResponse>();
  const [error, setError] = React.useState<ErrorResponse>();
  const [submitError, setSubmitError] = React.useState<ErrorResponse>();

  const initialValues = useInitialValues(survey);
  const ValidationSchema = useYupValidation(survey);

  React.useEffect(() => {
    client
      .get(paths.survey.get, 200)
      .then((survey) => {
        setSurvey(survey);
        setError(undefined);
      })
      .catch((error) => setError(JSON.parse(error.message)));
  }, [client]);

  const handleSubmit = (values: Form) => {
    if (!survey) return;

    client
      .post(paths.survey.answers(survey?.data.id), values, 201)
      .then((response) => {
        setSubmitError(undefined);
        navigate("/success", { state: { response } });
      })
      .catch((error) => setSubmitError(JSON.parse(error.message)));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="shadow-md p-8 rounded-3xl">
        {(() => {
          if (error) return <LoadingError error={error} />;

          if (!survey) return <Loading />;

          return (
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ValidationSchema}>
              <SurveyForm survey={survey} submitError={submitError} />
            </Formik>
          );
        })()}
      </div>
    </div>
  );
}
