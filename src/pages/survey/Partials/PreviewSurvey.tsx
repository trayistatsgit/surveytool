import React, { useEffect, useState } from 'react';
import '../CreateSurvey.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Div } from '../../../blocks';
import { useParams } from 'react-router-dom';
import { getSurveyByIdThunk } from '../../../redux/slice/survey/getSurveyById';

export interface Question {
  questionId: number | null;
  questionName: string;
  questionType: number;
  options?: IQuestionName[];
}
interface IQuestionName {
  id?: string | number;
  optionText?: string;
}

const PreviewSurvey: React.FC = () => {
  const dispatch = useAppDispatch();
  const { surveyId } = useParams();
  const surveyInitialData = {
    surveyName: 'Untitle',
    surveyDescription: 'Untitle',
    logo: '',
    pageNo: 1,
    surveyId: surveyId,
    surveyQuestions: [
      {
        questionType: 4,
        questionId: 1,
        questionName: '',
        options: [
          {
            optionId: 1,
            optionText: '',
          },
        ],
      },
    ],
  };
  const [surveyForm, setSurveyForm] = useState(surveyInitialData);
  // Question text input change handle
  const { data } = useAppSelector((state) => state.getSurveyByIdSlice);
  const handlePreviewSurvey = () => {
    window.open(`/create-survey/${surveyId}`, '_blank');
  };

  useEffect(() => {
    dispatch(getSurveyByIdThunk(surveyId || ''));
  }, []);
  useEffect(() => {
    const surveyData = data?.data?.[0];
    const cloneData = JSON.stringify(surveyData);
    const parseData = JSON.parse(cloneData);
    setSurveyForm(parseData);
  }, [data]);
  return (
    <Div>
      <div className='newContaner'>
        <>
          <div className='containernew'>
            <section className='mainContainer'>
              <section className='containerCreateSurvey'>
                {/* Logo Popup Section */}
                {surveyForm.logo && (
                  <div>
                    <img src={surveyForm.logo} alt='Survey Logo' className='surveyLog' />
                  </div>
                )}
                <section className='surveyPage'>
                  <div className='surveyTitle'>
                    <h1>
                      <span>{surveyForm.surveyName}</span>
                    </h1>
                  </div>

                  <div className='surveyPage'>
                    <div className='surveyTitle'>
                      <h1>
                        <span>{surveyForm.surveyDescription}</span>
                      </h1>
                    </div>
                  </div>
                  <div>
                    <h3>Questions Preview:</h3>
                    {surveyForm.surveyQuestions.map((q, i) => (
                      <div key={q.questionId} className='question-preview'>
                        <strong>Q: {i + 1}</strong> {q.questionName || 'No question text provided'}
                        <div className='options-preview'>
                          {q.questionType === 2 && q.options && (
                            <select className='preview-dropdown'>
                              {q.options
                                .filter((option) => option.optionText.trim() !== '')
                                .map((option, idx) => (
                                  <option key={idx} value={option.optionText}>
                                    {option.optionText}
                                  </option>
                                ))}
                            </select>
                          )}

                          {q.questionType === 3 &&
                            q.options &&
                            q.options
                              .filter((option) => option.optionText.trim() !== '')
                              .map((option, idx) => (
                                <div key={idx}>
                                  <input type='checkbox' id={`mc-${q.questionId}-${idx}`} />
                                  <label htmlFor={`mc-${q.questionId}-${idx}`}>{option.optionText}</label>
                                </div>
                              ))}

                          {q.questionType === 5 &&
                            q.options &&
                            q.options
                              .filter((option) => option.optionText.trim() !== '')
                              .map((option, idx) => (
                                <div key={idx}>
                                  <input type='radio' name={`radio-${q.questionId}`} id={`radio-${q.questionId}-${idx}`} />
                                  <label htmlFor={`radio-${q.questionId}-${idx}`}>{option.optionText}</label>
                                </div>
                              ))}

                          {q.questionType === 6 &&
                            q.options &&
                            q.options
                              .filter((option) => option.optionText.trim() !== '')
                              .map((option, idx) => (
                                <div key={idx}>
                                  <input type='checkbox' id={`cb-${q.questionId}-${idx}`} />
                                  <label htmlFor={`cb-${q.questionId}-${idx}`}>{option.optionText}</label>
                                </div>
                              ))}

                          {q.questionType === 1 && <input type='text' placeholder='Text input preview' />}
                          {q.questionType === 4 && <textarea placeholder='Textarea input preview'></textarea>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <section className='surveyPage'>
                  <div className='createFooterContainer'>
                    <div className='createFooterDivOne'>
                      <p className='createFooterParaOne'>Powered by</p>
                      <b className='createFooterBold'>Survey Programming Tool</b>
                      <p className='createFooterParaTwo'>
                        See how easy it is to <a href=''>create survey and forms</a>
                      </p>
                    </div>
                  </div>

                  <div className='createPreviewContainer'>
                    <button className='createPreviewButton' onClick={handlePreviewSurvey}>
                      Update the Survey
                    </button>
                  </div>
                </section>
              </section>
            </section>
          </div>
        </>
      </div>
    </Div>
  );
};

export default PreviewSurvey;
