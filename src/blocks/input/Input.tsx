import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import './Input.scss';
import { Typography } from '../typography/TypographyAtom';
import eyebutton from '../../assets/show.png';

import { textColors, fontWeights, fontSizes, Div } from '../index';
import { ShowPassWordEye } from '../../assets/signup-img';

const variants = {
	default: 'default',
	help: 'help',
	error: 'error',
	disable: 'disable',
	withImage: 'withImage',
};

interface InputProps {
	label?: string;
	className?: string;
	variant?: keyof typeof variants;
	imageUrl?: string;
	tooltipMessage?: string;
	placeholder?: string;
	grid?: string;
	width?: string;
	height?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	type?: string;
	disable?: boolean;
	fontSize?: string;
	typoColor?: keyof typeof textColors;
	typoWeight?: keyof typeof fontWeights;
	typoSize?: keyof typeof fontSizes;
	name?: string;
	signup?: boolean;
	imageUrlInput?: string;
	datepicker?: boolean;
	pattern?: any;
}

export const InputAtom: React.FC<InputProps> = ({
	label,
	className,
	placeholder,
	grid = 'grid-1',
	width = '',
	height = '',
	onChange,
	value,
	type,
	disable = false,
	typoColor = 'primary',
	typoSize = 'fontSize12',
	typoWeight = 'medium',
	name = '',
	signup = false,
	datepicker = false,
	imageUrlInput,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const dateInputRef = useRef<HTMLInputElement>(null);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleClick = () => {
		if (datepicker && dateInputRef.current) {
			dateInputRef.current.showPicker();
		}
	};

	const borderSCSS: string = '';
	const determineInputType = () => {
		if (type === 'password') {
			return isPasswordVisible ? 'text' : 'password';
		}
		return type;
	};
	const handleInvalid = (event) => {
		event.preventDefault(); 
		event.target.setCustomValidity(''); 
	};
	return (
		<Div className={grid}>
			<>
				<Typography className={clsx('input-Typography')} isSpan={true} label={label} fontSize={typoSize} fontWeight={typoWeight} textColor={typoColor} />
				{datepicker ? (
					<input
						type='date'
						placeholder={placeholder}
						className={clsx('input-field', 'custom-date-input', borderSCSS, className)}
						onChange={onChange}
						value={value}
						disabled={disable ? true : false}
						style={{
							width,
							height,
						}}
						name={name}
						ref={dateInputRef}
						onClick={handleClick}
					/>
				) : (
					<input
						placeholder={placeholder}
						className={clsx('input-field', borderSCSS, className)}
						onChange={onChange}
						value={value}
						type={determineInputType()}
						disabled={disable ? true : false}
						style={{
							width,
							height,
						}}
						name={name}
						onInvalid={handleInvalid}
					/>
				)}
				{imageUrlInput ? (
					<div className='image-container-input'>
						<img src={imageUrlInput} alt='Input Image' className='search-image' />
					</div>
				) : (
					type === 'password' && (
						<div className='toggle-password' onClick={togglePasswordVisibility}>
							<img src={isPasswordVisible ? eyebutton : ShowPassWordEye} alt='Toggle Password Visibility' className={signup ? 'eye-icon-signup' : 'eye-icon'} />
						</div>
					)
				)}
			</>
		</Div>
	);
};
