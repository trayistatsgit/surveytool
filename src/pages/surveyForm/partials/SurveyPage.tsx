import React, { useState } from "react";
import SurveyForm from '../SurveyForm';
// Import the Question interface
import { Question } from '../SurveyForm';
import '../partials/SurveyPage.scss';

const SurveyPage: React.FC = () => {
  const [responses, setResponses] = useState<Question[] | null>(null);

  // Function to handle form submission and collect answers
  const handleSurveySubmit = (submittedResponses: Question[]) => {
    setResponses(submittedResponses);
  };

  return (
    <div className="survey-page-container">
      <h1 className="survey-page-title">Survey</h1>
      {!responses ? (
        <SurveyForm onSubmit={handleSurveySubmit} />
      ) : (
        <div className="responses-container">
          <h2 className="responses-title">Survey Responses</h2>
          {responses.map((question) => (
            <div key={question.id} className="response-item">
              <strong className="response-question-text">{question.questionText}</strong>
              <p className="response-answer">
                {question.questionType === "multipleChoice"
                  ? (question.answer as string[]).join(", ")
                  : question.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyPage;
