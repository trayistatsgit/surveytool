import React, { useState } from 'react';
import './NewPage.scss';
import CreateSurvey from '../CreateSurvey';
interface SurveyResponse {
    [key: string]: any;
    clones: any;
    index:number;
}
 
const NewPage: React.FC<SurveyResponse> = () => {
    const [clones, setClones] = useState<number[]>([1]);
 
    // Function to add a new page at the given index
    const addClone = (index: number) => {
        const newClones = [...clones];
        newClones.splice(index + 1, 0, newClones.length + 1); // Add new clone after the index
        setClones(newClones);
    };
 
    return (
        <div>
            {clones.map((item, index) => (
                 <><CreateSurvey
                    pageNumber={index}
                    setClones={setClones}
                    clones={clones}
                    item={item} addClone={undefined} /><div key={index} className="page-container">
                         <div className="pageClonebtn">
                            <div
                                className="container-newPage"
                                onClick={() => addClone(clones[0])}
                            >
                                <div className="logo-newPage">
                                    <span className="logo-color">+</span>
                                </div>
                                <p className="newPage-text">NEW PAGE </p>
                            </div>


                        </div>
                    </div></>
            ))}
            
        </div>
    );
};
 
export default NewPage;