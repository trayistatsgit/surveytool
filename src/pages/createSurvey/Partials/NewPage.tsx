/* eslint-disable no-unused-vars */
import React from 'react';
import './NewPage.scss';

interface SurveyResponse {
    [key: string]: any;
    clones:any
}

const NewPage: React.FC<SurveyResponse >  = ({setClones, clones,formIndex}) => {
  
 
    const addClone = () => {
        const newIndex = clones.length; 
        const newClones = [...clones]; 
        newClones.splice(newIndex, 0, formIndex+1); 
        setClones(newClones); 
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