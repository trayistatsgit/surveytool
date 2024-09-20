import React from 'react';
import clsx from 'clsx';
import './DropdownInputAtom.scss'; 
import { Div, fontSizes, fontWeights, textColors, Typography } from '../../blocks';

interface DropdownInputProps {
  label?: string;
  className?: string;
  placeholder?: string; 
  grid?: string;
  width?: string;
  height?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  disable?: boolean;
  typoColor?: keyof typeof textColors;
  typoSize?: keyof typeof fontSizes;
  typoWeight?: keyof typeof fontWeights;
  name?: string;
  options?: { value: string; label: string }[]; 
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  className,
  grid = 'grid-1',
  width = '',
  height = '',
  onChange,
  value,
  disable = false,
  typoColor = 'primary',
  typoSize = 'fontSize12',
  typoWeight = 'medium',
  name = '',
  placeholder = 'Select an option', 
  options = [],
}) => {
  return (
    <Div className={grid}>
      <>
        <Typography className={clsx('input-Typography-dropdown')} isSpan={true} label={label} fontSize={typoSize} fontWeight={typoWeight} textColor={typoColor} />
        <select
          className={clsx('input-field-dropdown', className)}
          onChange={onChange}
          value={value}
          disabled={disable}
          style={{
            width,
            height,
          }}
          name={name}
        >
        
          <option value="" disabled selected={!value}>
            {placeholder}
          </option>
          {options.length > 0 ? (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option disabled>No options available</option>
          )}
        </select>
      </>
    </Div>
  );
};
