import React from "react";

import paths from "../../api/paths";
import { ErrorResponse, SurveyResponse } from "../../api/survey/types";
import { useClient } from "../../components/ClientProvider/ClientProvider";
import SurveyForm from "../../components/SurveyForm/SurveyForm";

export default function Index() {
  const { client } = useClient();

  const [survey, setSurvey] = React.useState<SurveyResponse>();
  const [error, setError] = React.useState<ErrorResponse>();

  React.useEffect(() => {
    client
      .get(paths.survey.get, 200)
      .then((survey) => {
        setSurvey(survey);
      })
      .catch((error) => {
        setError(JSON.parse(error.message));
      });
  }, [client]);

  if (error) return <>{error.errors.map((err) => err.detail).join(" ")}</>;

  return <>{survey && <SurveyForm />}</>;
}
