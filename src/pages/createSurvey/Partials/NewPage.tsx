/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './NewPage.scss';

interface SurveyResponse {
    [key: string]: any;
    clones:any
}

const NewPage: React.FC<SurveyResponse >  = ({setClones, clones}) => {
  
 
    const addClone = () => {
        const newIndex = clones.length; // Get the current number of clones
       
        setClones([...clones, newIndex]); // Add the new clone index
       
    };

  
    const handleSubmit = (responses: SurveyResponse) => {
        console.log(responses);
    };
console.log(clones); 


return (
        <div >
            <div>
                <div className='container-newPage' onClick={addClone}>
                    <div className='logo-newPage'>
                        <span className='logo-color'>+</span>
                    </div>
                    <p className='newPage-text'>NEW PAGE</p>
                </div>
            </div>
        </div>
    );

}
export default NewPage;