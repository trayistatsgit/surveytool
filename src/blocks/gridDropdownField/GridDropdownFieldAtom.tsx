import React, { ChangeEvent } from 'react';
import './GridDropdownField.scss';
import { Typography, fontSizes, fontWeights } from '../typography/TypographyAtom';

interface GridDropdownFieldProps {
  label: string;
  name: string;
  options: { id: string; name: string; isoCode: string }[];
  className?: string;
  fontWeight?: keyof typeof fontWeights;
  fontSize?: keyof typeof fontSizes;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const GridDropdownField: React.FC<GridDropdownFieldProps> = ({
  label,
  name,
  options,
  fontWeight = 'regular',
  fontSize = 'fontSize12',
  className,
  value,
  onChange,
}) => {
  return (
    <div className={`grid-input-field ${className}`}>
      <Typography label={label} fontSize={fontSize} fontWeight={fontWeight} className='input-label' />
      <select id={name} name={name} value={value} onChange={onChange} className='dropdown-select'>
        <option value=''>{value ? value : `Select ${label}`}</option>
        {options?.map((option, index) => (
          <option className='account-options' key={index} value={option.name || value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GridDropdownField;
