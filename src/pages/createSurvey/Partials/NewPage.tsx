import React, { useState } from 'react';
import './NewPage.scss';
import CreateSurvey from '../CreateSurvey';

interface SurveyResponse {
    [key: string]: any; // Adjust the type based on the expected structure of the survey response
    page?:number;
}

const NewPage: React.FC<SurveyResponse> = () => {
    const [clones, setClones] = useState<number[]>([]);
    const [page, setPage]=useState<number>(0)

    const addClone = () => {
      
        setClones([...clones, clones.length]);
        pageIncrese();
        console.log(...clones)
    };
    const pageIncrese = () => { 
        setPage((page: number) => {
            return page + 1;
        });
        
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
            <div className='' >
                {clones.map((_, index) => (
                    <CreateSurvey key={index} onSubmit={handleSubmit } pageNumber={clones.length}  />
                ))}

                </div>
        </div>
        
    );
}

export default NewPage;
