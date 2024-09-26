import React, { useState } from 'react';
import TitleAtom from '../../../atoms/TitleAtom/TitleAtom';
import { InputAtom, Typography } from '../../../blocks';
import { DropdownInput } from '../../../atoms/DropdownInputAtom/DropdownInput';
import './SurveyTitle.scss';

interface SurveyTitleProps {
  onSave: (value: string, alignment: string) => void;
  initialValue?: string; // Prop for initial value
  initialAlignment?: string; // Prop for initial alignment
  onCancel?:()=>void;
 
 
}

const SurveyTitle: React.FC<SurveyTitleProps> = ({onSave, initialValue, initialAlignment,onCancel}) => {
  const [selectedValue, setSelectedValue] = useState<string>(initialAlignment || ''); // Dropdown value
  const [inputValue, setInputValue] = useState<string>(initialValue || ''); // Input field value
  //const [isComponentVisible, setIsComponentVisible] = useState<boolean>(true); // Show/hide component

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCancel = () => {
  onCancel();

  };

  const handleSave = () => {
    onSave(inputValue, selectedValue); // Pass the input value to the grandparent's state
  };

  const options = [
    { value: 'Left-Alignment', label: 'Left-Alignment' },
    { value: 'Center-Alignment', label: 'Center-Alignment' },
  ];

 



  return (
    <div>
      <div className='Survey-title'>
        <Typography label="Survey Title" fontSize='fontSize14' fontWeightstest={500} />
        
        <InputAtom
          value={inputValue}
          onChange={handleInputChange}
          className={selectedValue === 'Center-Alignment' ? 'Center-Alignment' : 'Left-Alignment'}
        />
        
        <Typography label="You are Good up to 250 characters" className='sub-text' fontWeight='bold' />
        <Typography label="Alignment" fontSize='fontSize14' fontWeightstest={500} />
        
        <DropdownInput
          className='Alignment-section'
          placeholder='Text Alignment'
          value={selectedValue}
          options={options}
          onChange={handleChange}
          width='250px'
          height='40px'
        />
        
        <TitleAtom onCancel={handleCancel} onSave={handleSave} />
      </div>
    </div>
  );
};

export default SurveyTitle;
