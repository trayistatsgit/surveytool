import React, { useState } from 'react';
import './NewPage.scss';
import CreateSurvey from '../CreateSurvey';

interface SurveyResponse {
    [key: string]: any; // Adjust the type based on the expected structure of the survey response
}

const NewPage: React.FC = () => {
    const [clones, setClones] = useState<number[]>([]);

    const addClone = () => {
        setClones([...clones, clones.length]);
    };

    const handleSubmit = (responses: SurveyResponse) => {
        console.log(responses);
    };

    return (
        <div>
            <div className='container-newPage' onClick={addClone}>
                <div className='logo-newPage'>
                    <span className='logo-color'>+</span>
                </div>
                <p className='newPage-text'>NEW PAGE</p>
            </div>
            <div>
                {clones.map((_, index) => (
                    <CreateSurvey key={index} onSubmit={handleSubmit} />
                ))}
            </div>
        </div>
    );
}

export default NewPage;
