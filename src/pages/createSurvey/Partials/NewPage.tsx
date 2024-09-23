import React, { useState } from 'react';
import './NewPage.scss';
import CreateSurvey from '../CreateSurvey';

const NewPage = () => {
    const [clones, setClones] = useState<number[]>([]);

    const addClone = () => { 
        setClones([...clones, clones.length]); 
    }; 

    return (
        <div>
            <div className='container-newPage' onClick={addClone}>
                <div className='logo-newPage'><span className='logo-color'>+</span></div>
                <p className='newPage-text'>NEW PAGE</p>
            </div>
            <div>
                {clones.map((_, index) => (
                    <CreateSurvey key={index} onSubmit={(responses) => console.log(responses)} />
                ))}
            </div>
        </div>
    );
}

export default NewPage;
