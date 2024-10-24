import React, { useEffect, useState } from 'react';
import '../CreateSurvey.scss';
import { Div } from '../../../blocks';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { getSurveyByIdThunk } from '../../../redux/slice/survey/getSurveyById';
import QuestionPreview from './QuestionPreview';
import { attemptSurveyThunk } from '../../../redux/slice/survey/attemptSurvey';
interface Question {
  questionId: number;
  questionName: string;
  questionType: number;
  options: Option[];
}
interface Option {
  optionId: number;
  optionText: string;
}
interface SurveyData {
  surveyName: string;
  surveyDescription: string;
  logo: string;
  pageNo: number;
  surveyId: string;
  surveyQuestions: Question[];
}
interface AggregateData {
  questionId: number;
  questionType: number;
  options: string | number | number[];
}
const AttemptSurvey: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { surveyId = '' } = useParams();
  const currentUrl = window.location.href;
  const surveyInitialData: SurveyData = {
    surveyName: 'Untitled',
    surveyDescription: 'Untitled',
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
  const [surveyForm, setSurveyForm] = useState<SurveyData>(surveyInitialData);
  const [aggrigateData, setAggrigateData] = useState<AggregateData[]>([]);
  const { data } = useAppSelector((state) => state.getSurveyByIdSlice);
  const handlePreviewSurvey = () => {
    window.open(`/survey-preview/${surveyId}`, '_blank');
  };
  useEffect(() => {
    if (surveyId) {
      dispatch(getSurveyByIdThunk(surveyId));
    }
  }, [dispatch, surveyId]);
  useEffect(() => {
    if (data?.data?.[0]) {
      const surveyData = data.data[0];
      setSurveyForm(surveyData);
    }
  }, [data]);
  const handleAttemptSurvey = async () => {
    const { payload } = (await dispatch(attemptSurveyThunk({ questions: aggrigateData, participantUrl: currentUrl, surveyId }))) as any;
    if (payload && payload?.status === 200) {
      navigate(`/survey-result/${surveyId}`);
    }
  };

  return (
    <Div>
      <div className='newContaner'>
        <div className='containernew'>
          <section className='mainContainer'>
            <section className='containerCreateSurvey'>
              <div>{/* <LogoCreateSurvey onLogoUpload={setUploadedLogo} /> */}</div>

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
                  {surveyForm.surveyQuestions.map((q, index: number) => (
                    <QuestionPreview key={q.questionId} questions={q} setAggrigateData={setAggrigateData} qNumber={index + 1} />
                  ))}
                </div>
                <button type='button' onClick={handleAttemptSurvey}>
                  Submit
                </button>
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
      </div>
    </Div>
  );
};

export default AttemptSurvey;
