import React, { useState } from 'react';
import './RadioButton.scss';

interface RadioButtonProps {
  name: string;
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ className, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className={`custom-radio-group ${className}`} onClick={handleClick}>
      <div className={`custom-radio ${isChecked ? 'checked' : ''}`}>
        <div className='radio-dot'></div>
      </div>
    </div>
  );
};

export default RadioButton;
