import React, { useState } from 'react';
import './NewPage.scss';

interface SurveyResponse {
  [key: string]: unknown;
}

const NewPage: React.FC<SurveyResponse> = () => {
  const [clones, setClones] = useState<number[]>([]);

  const addClone = () => {
    setClones([...clones, clones.length]);
  };

  // const handleSubmit = (responses: SurveyResponse) => {
  // 	console.log(responses);
  // };

  return (
    <div>
      <div className='container-newPage' onClick={addClone}>
        <div className='logo-newPage'>
          <span className='logo-color'>+</span>
        </div>
        <p className='newPage-text'>NEW PAGE</p>
      </div>
      <div className=''>
        {/* {clones.map((_, index) => (
					<CreateSurvey />
				))} */}
      </div>
    </div>
  );
};

export default NewPage;
