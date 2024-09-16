import React from 'react';
import clsx from 'clsx';
import './Checkbox.scss';
export interface CheckboxProps {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	label?: any;
	children?: React.ReactNode;
	className?: string;
	name?: string;
	value?: string | number | readonly string[] | undefined;
	setChecked?: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, label, children, className, name, setChecked }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		setChecked(checked);
	};

	return (
		<label className='label-check'>
			<input type='checkbox' checked={checked} className={clsx(className)} name={name} onChange={handleChange} />
			<span className='chebox-label'>{label}</span>
			{children}
		</label>
	);
};
