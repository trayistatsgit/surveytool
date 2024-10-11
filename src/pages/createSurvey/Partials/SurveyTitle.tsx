import React, { useState } from 'react';
import TitleAtom from '../../../atoms/TitleAtom/TitleAtom';
import { InputAtom, Typography } from '../../../blocks';
import { DropdownInput } from '../../../atoms/DropdownInputAtom/DropdownInput';
import './SurveyTitle.scss';

interface SurveyTitleProps {
    onSave: (value: string) => void;
}

const SurveyTitle: React.FC<SurveyTitleProps> = ({ onSave }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [inputText, setInputText] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    const options = [
        { value: 'Left-Alignment', label: 'Left-Alignment' },
        { value: 'Center-Alignment', label: 'Center-Alignment' },
    ];

    const saveSlider = () => {
        console.log('Survey Title:', inputText); // Log the input text
        onSave(inputText); // Call the onSave function with the input text
        setInputText(''); // Clear the input after saving
    };

    return (
        <div className='surveyTitleContainer'>
            <div className='Survey-title'>
                <Typography label='Survey Title' fontSize='fontSize14' fontWeight='bold' />
                <InputAtom 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)} 
                    maxLength={250} // Limit input to 250 characters
					
                />
                <Typography label='You are good up to 250 characters' className='sub-text' fontWeight='bold' />
                <Typography label='Alignment' fontSize='fontSize14' />
                <DropdownInput 
                    className='Alignment-section' 
                    placeholder='Text Alignment' 
                    value={selectedValue} 
                    options={options} 
                    onChange={handleChange} 
                    width='250px' 
                    height='40px' 
                />
            </div>
            <TitleAtom onCancel={() => setInputText('')} onSave={saveSlider} />
        </div>
    );
};

export default SurveyTitle;
