// In SurveyPage.tsx
import React, { useState } from "react";
import SurveyForm from '../SurveyForm';
// Import the Question interface
import { Question } from '../SurveyForm';
import '../partials/SurveyPage.scss'

const SurveyPage: React.FC = () => {
  const [responses, setResponses] = useState<Question[] | null>(null);

  // Function to handle form submission and collect answers
  const handleSurveySubmit = (submittedResponses: Question[]) => {
    setResponses(submittedResponses);
  };

  return (
    <div>
      <h1>Survey</h1>
      {!responses ? (
        <SurveyForm onSubmit={handleSurveySubmit} />
      ) : (
        <div>
          <h2>Survey Responses</h2>
          {responses.map((question) => (
            <div key={question.id}>
              <strong>{question.questionText}</strong>
              <p>
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
