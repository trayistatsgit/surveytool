import React, { useState, useRef, useEffect } from 'react';
import '../editSurveyCards/EditSurveyCard.scss';
import { Button, Typography } from '../../blocks';
import { editimages } from '../../assets/surveyEditt-img';
import SurveyDowndrop from '../../atoms/surveyDowndrop/SurveyDowndrop';

interface SurveyProps {
  status: string;
  updatedDate: string;
  issue: string;
  id: number;
  active: string;
  surveyName: string;
  redirectSurvey: () => void;
}

const EditSurveyCard: React.FC<SurveyProps> = ({ status, updatedDate, issue, id, surveyName, redirectSurvey }) => {
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

  return (
    <div className='card-survey-edit' ref={dropdownRef} onClick={redirectSurvey}>
      <div className='survey-draft'>
        <span>{status}</span>
        <div className='dot-icon-container'>
          <div className='dot-icon' onClick={() => setIsDropdownOpen((prev) => !prev)}>
            {isDropdownOpen ? 'x' : '...'}
          </div>
        </div>
        {isDropdownOpen && <SurveyDowndrop />}
      </div>
      <div className='survey-content'>
        <div className='survey-title'>
          <Typography label={`${surveyName ?? 'Untitled'}`} fontSize='fontSize24' fontWeight='bold' />
          <Typography label={`${id}`} fontSize='fontSize24' fontWeight='bold' />
        </div>
        <div className='updated-date'>
          <Typography label={`${updatedDate}`} fontSize='fontSize14' fontWeight='regular' />
        </div>
      </div>
      <div className='survey-edit-container'>
        <div className='issue'>
          <img src={editimages} alt={`Edit icon for survey ${issue}`} />
          <Typography label={`${issue}`} fontSize='fontSize14' fontWeight='regular' />
        </div>
        <div className='survey-edit-button'>
          <Button className='fix-btn' label='Edit Survey' />
        </div>
      </div>
    </div>
  );
};

export default EditSurveyCard;
