import React from "react";

import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

import paths from "../../api/paths";
import { ErrorResponse, SurveyResponse } from "../../api/survey/types";
import { useClient } from "../../components/ClientProvider/ClientProvider";
import Loading from "../../components/Fallback/Loading";
import LoadingError from "../../components/Fallback/LoadingError";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import useYupValidation from "../../hook/useYupValidation";

export type SurveyFormType = {
  [key: string]: string;
};

const useInitialValues = (survey: SurveyResponse | undefined): SurveyFormType => {
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

const getSurveyStatusCodes = [200, 500];
const postSurveyAnswersStatusCodes = [201, 422];

export default function Index() {
  const { client } = useClient();
  const navigate = useNavigate();

  const [survey, setSurvey] = React.useState<SurveyResponse>();
  const [error, setError] = React.useState<ErrorResponse>();
  const [submitError, setSubmitError] = React.useState<ErrorResponse>();

  const initialValues = useInitialValues(survey);
  const ValidationSchema = useYupValidation(survey);

  React.useEffect(() => {
    // get random getSurveyStatusCode with 80% chance of 200 to demonstrate functionality
    const randomSurveyStatusCode = getSurveyStatusCodes[Math.floor(Math.random() * 5) < 4 ? 0 : 1];

    client
      .get(paths.survey.get, randomSurveyStatusCode)
      .then((survey) => {
        setSurvey(survey);
        setError(undefined);
      })
      .catch((error) => setError(JSON.parse(error.message)));
  }, [client]);

  const handleSubmit = (values: SurveyFormType, helpers: FormikHelpers<SurveyFormType>) => {
    if (!survey) return;

    // get random postSurveyAnswersStatusCode with 80% chance of 201 to demonstrate functionality
    const randomSurveyAnswersStatusCode = postSurveyAnswersStatusCodes[Math.floor(Math.random() * 5) < 4 ? 0 : 1];

    client
      .post(paths.survey.answers(survey?.data.id), values, randomSurveyAnswersStatusCode)
      .then((response) => {
        setSubmitError(undefined);
        navigate("/success", { state: { response } });
      })
      .catch((error) => {
        helpers.setSubmitting(false);
        setSubmitError(JSON.parse(error.message));
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative overflow-hidden pb-10">
      <div className="bg-gray-50 shadow-lg p-8 rounded-3xl z-10 2xl:w-1/3 max-w-3xl mt-52 m-4">
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
