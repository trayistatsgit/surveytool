import React, { useState, useRef, useEffect } from 'react';
import '../editSurveyCards/EditSurveyCard.scss'
import { Button, Typography } from '../../blocks';
import { editimages } from '../../assets/surveyEditt-img';
import SurveyDowndrop from '../../atoms/surveyDowndrop/SurveyDowndrop'
interface SurveyProps {
  status: string;
  updatedDate: string;
  issue: string;
}
const EditSurveyCard: React.FC<SurveyProps> = ({ status, updatedDate, issue }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const showBreadcrumbData = () => {
    localStorage.setItem('showBreadcrumb', JSON.stringify(true)); 
    window.dispatchEvent(new Event('storage')); 
};
  return (
    <>
      <div className="card-survey-edit" ref={dropdownRef} onClick={showBreadcrumbData}>
        <div className="survey-draf">
          <span>{status}</span>
          <div className='dot-icon-container'>
            {!isDropdownOpen ? <div className='dot-icon' onClick={() => setIsDropdownOpen(true)}>...</div> : <div className='cross-icon'onClick={() => setIsDropdownOpen(false)}>x</div>}
          </div>
          {isDropdownOpen &&
          <SurveyDowndrop />

          }
        </div>
      <div className='survey-content'>
      <div className="survey-title">
          <Typography label='survey' fontSize='fontSize24' fontWeightstest={500} fontWeight='bold' />
          </div>
          <div className='updated-date'>
            <Typography label={` 📅Updated: ${updatedDate}`} fontSize='fontSize14' fontWeight='regular'/>
            
        </div>
      </div>
       <div className='survey-edit-container'>
       <div className="issue">
        <img src={editimages} alt='NotFound' />
        <Typography label={`${issue}`}fontSize='fontSize14' fontWeight='regular'/>
        </div>
        <div className='survey-edit-button'>
        <Button className="fix-btn" label='Edit Survey' />
        </div>
       </div>
      </div>
    </>
  );
};

export default EditSurveyCard;