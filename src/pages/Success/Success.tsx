import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import awardsSrc from "../../../assets/awards.svg";
import { SurveyAnswersResponse } from "../../api/survey/types";
import ActionButton from "../../components/ActionButton/ActionButton";
import { firstLetterUppercase } from "../../util/text";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();

  const { response }: { response: SurveyAnswersResponse } = location.state;

  const isNumeric = (n: string) => {
    return !isNaN(parseFloat(n)) && isFinite(Number(n));
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative overflow-hidden pb-10">
      <img src={awardsSrc} alt="" className="h-52 mt-10" />
      <h1 className="text-3xl font-semibold my-10">Thank you for your submission!</h1>
      <div className="bg-gray-50 shadow-lg p-8 rounded-3xl z-10 w-96 xl:w-1/3 m-4 relative">
        <div className="flex flex-col">
          <p className="text-xl mb-4">Here are your answers:</p>
          <div className="grid grid-cols-4">
            {response.data.attributes.answers.map((answer) => (
              <React.Fragment key={answer.questionId}>
                <div className="font-bold text-indigo-500">{firstLetterUppercase(answer.questionId)}:</div>
                <div className="col-span-3">
                  {isNumeric(answer.answer as string) ? (
                    <div className="p-1 bg-indigo-500 rounded-lg w-6 h-6 text-white flex flex-col justify-center items-center">
                      {answer.answer}
                    </div>
                  ) : (
                    answer.answer
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <ActionButton onClick={() => navigate("/")} className="mt-6">
        Submit another survey
      </ActionButton>
    </div>
  );
}
