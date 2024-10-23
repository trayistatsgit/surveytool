import React from 'react';
import './button.scss';
import clsx from 'clsx';

const variants = {
	primary: 'brandPrimary',
	secondary: 'brandSecondary',
	tertiary: 'backgroundTertiary',
	transparent: 'button-transparent',
	signprimary: 'signupPrimary',
	surveyprimary: 'surveyPrimary',
	blue: 'button-blue',
	orange: 'button-orange',
	danger: 'button-red',
	secondoryBtn: 'btn-color-secondry',
	gray: 'btn-color-gray',
	primaryquestionary: 'primaryQuestionary',
};

const sizes = {
	sm: 'button-sm',
	md: 'button-md',
	lg: 'button-lg',
};

const colors = {
	white: 'btn-color-white',
	blue: 'btn-color-blue',
	black: 'btn-color-black',
	theme: 'btn-color-theme',
	grey: 'btn-color-grey',
	navyblue: 'btn-color-navyblue',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
	color?: keyof typeof colors;
	label?: string;
	onClick?: () => void;
	className?: string;
	isLoading?: boolean;
	isDisable?: boolean;
	img?: string;
	reverse?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, reverse = false, variant = 'primary', size = 'md', color = 'white', label, img = '', onClick, isLoading, isDisable, ...props },
		ref
	) => {
		return (
			<button
				ref={ref}
				className={clsx(variants[variant], sizes[size], colors[color], className, { loading: isLoading })}
				{...props}
				onClick={onClick}
				style={{ color }}
				disabled={isDisable}>
				{isLoading ? (
					<span className='button-spinner' />
				) : (
					<>
						{img && img !== '' ? (
							<>
								{reverse ? (
									<span className='button-label-img-two'>
										{label}
										<img src={img} alt='img' className='media-img' />
									</span>
								) : (
									<span className='button-label-img'>
										<img src={img} alt='img' className='media-img' />
										<span className='label-text'>{label}</span>
									</span>
								)}
							</>
						) : (
							<span className='button-label'>{label}</span>
						)}
					</>
				)}
			</button>
		);
	}
);

Button.displayName = 'Button';
