import React from 'react';
import clsx from 'clsx';
import './MultipleChoiceAtom.scss'; // Ensure you have the appropriate styles

interface Option {
  value: string;
  label: string;
}

interface MultipleChoiceProps {
  label?: string;
  options: Option[];
  selectedValues: Set<number>; // Track multiple selections
  onChange: (value: number) => void;
  onRemove: (value: number) => void;
  className?: string;
  disabled?: boolean;
  typoColor?: string; // Define color class or value here
  typoSize?: string; // Define size class or value here
  typoWeight?: string; // Define weight class or value here
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  onRemove,
  className,
  disabled = false,
  typoColor = 'black',
  typoSize = 'fontSize14',
  typoWeight = 'normal',
}) => {
  return (
    <div className={clsx('multiple-choice-container', className)}>
      {label && (
        <label className={clsx('multiple-choice-label', typoSize, typoWeight, typoColor)}>
          {label}
        </label>
      )}
      <div className="multiple-choice-options">
        {options.map((option, index) => (
          <div
            key={option.value}
            className={clsx('multiple-choice-option', {
              'selected': selectedValues.has(index),
              'disabled': disabled,
            })}
          >
            <input
              type="checkbox"
              id={option.value}
              name="multiple-choice"
              checked={selectedValues.has(index)}
              onChange={() => !disabled && onChange(index)}
              disabled={disabled}
              className="multiple-choice-checkbox"
            />
            <label htmlFor={option.value} className="multiple-choice-option-label">
              {option.label}
            </label>
            {selectedValues.has(index) && (
              <button
                className="remove-option-button"
                onClick={() => onRemove(index)}
                disabled={disabled}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
