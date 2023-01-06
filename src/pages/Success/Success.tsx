import React from "react";

import { useLocation } from "react-router-dom";

import { SurveyAnswersResponse } from "../../api/survey/types";

export default function Success() {
  const location = useLocation();
  const { response }: { response: SurveyAnswersResponse } = location.state;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="shadow-md p-8 rounded-3xl">
        <div className="flex flex-col">
          <h1 className="text-3xl">Thank You for Your submission!</h1>
          <p>Your answers:</p>
          <ul>
            {response.data.attributes.answers.map((answer) => (
              <li key={answer.questionId}>
                {answer.questionId}: {answer.answer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
