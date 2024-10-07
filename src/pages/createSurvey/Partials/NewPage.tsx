import React from 'react';
import './NewPage.scss';

interface SurveyResponse {
    clones: number[]; // Assuming clones are represented as an array of numbers
    setClones: React.Dispatch<React.SetStateAction<number[]>>; // Function to update the clones state
}

const NewPage: React.FC<SurveyResponse> = ({ clones, setClones }) => {

    const addClone = (index: number) => {
        setClones((prevClones) => {
            const newCloneId = prevClones.length; // Unique ID for the new clone
            const newClones = [...prevClones];
            newClones.splice(index + 1, 0, newCloneId); // Insert newCloneId at index + 1
            return newClones; 
        });
    };

    

    return (
        <div>
            <div className='container-newPage' onClick={() => addClone(clones.length - 1)}>
                <div className='logo-newPage'>
                    <span className='logo-color'>+</span>
                </div>
                <p className='newPage-text'>NEW PAGE</p>
            </div>
        </div>
    );
}

export default NewPage;
