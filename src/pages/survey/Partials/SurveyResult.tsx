import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { surveyResultThunk } from '../../../redux/slice/survey/surveyResult';
import './SurveyResult.scss';
import { useParams } from 'react-router-dom';
interface QuestionOption {
  optionId: number;
  optionText: string;
  totalAnswered: number;
  percentageAnswered: number;
}

interface Question {
  questionText: string;
  questionId: number;
  options: QuestionOption[];
}
const SurveyResult: React.FC = () => {
  const dispatch = useAppDispatch();
  const { surveyId } = useParams();
  const { data } = useAppSelector((state) => state.surveyResultSlice);
  useEffect(() => {
    if (surveyId) {
      dispatch(surveyResultThunk(surveyId));
    }
  }, []);
  return (
    <div className='surveyResultCont'>
      <div className='surveyResult'>
        <h2>Survey Result</h2>
      </div>
      {data?.data?.questions?.map((item: Question, i: number) => (
        <>
          <h4>{`Q${i + 1}> ${item.questionText}`}</h4>
          {item.options.map((o: QuestionOption) => (
            <div key={o.optionId} className='poll-option'>
              <span className='poll-option__label'>{`${o.optionText} (${o.totalAnswered})`}</span>
              <table className='poll-option__result'>
                <tr>
                  <td></td>
                  <td>
                    <span></span>
                    <span style={{ width: `${o.percentageAnswered}%` }}></span>
                  </td>
                  <td>{o.percentageAnswered}%</td>
                </tr>
              </table>
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default SurveyResult;
