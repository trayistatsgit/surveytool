import React, { useState } from 'react';
import './SignUp.scss';
import { InputAtom } from '../../blocks/input/Input';
import '../../assets/signup-img';
import Apple from '../../assets/signup-img/Apple.svg';
import Google from '../../assets/signup-img/Google.svg';
import Mail from '../../assets/signup-img/Mail.svg';
import Slide1 from '../../assets/signup-img/Slide1.svg';
import { Typography } from '../../blocks';
import { Button } from '../../blocks/button/ButtonAtom';
import Slider from '../../blocks/slider/Slider';
import { Slide2, Slide3 } from '../../assets/signup-img';
import { Link, useNavigate } from 'react-router-dom';
import RadioButton from '../../atoms/RadioButton/RadioButton';

const SignUp = () => {
	const [tncBox, setTncBox] = useState<boolean>(false);

	const handleTncChange = (checked: boolean) => {
		setTncBox(checked);
	};

	const navigate = useNavigate();
	const images = [
		{
			src: Slide1,
			heading: 'Turn Data into Decisions',
			text: 'Unleashing Potential through Precision',
		},
		{
			src: Slide2,
			heading: 'Turn Data into Decisions',
			text: 'This is the text for Slide 2',
		},
		{
			src: Slide3,
			heading: 'Turn Data into Decisions',
			text: 'This is the text for Slide 3',
		},
	];

	const handleLogInClick = () => {
		navigate('/login');
	};
	const conditionText = (
		<>
			I have read and agree to&nbsp;
			<span>
				<Link to='/terms-conditions' className='terms-conditions'>
				Terms of Service
				</Link>
				&nbsp;and&nbsp;
				<Link to='/privacy-policy' className='terms-conditions'>
				Privacy Policy
				</Link>
			</span>
		</>
	);

	return (
		<div className='container-signup'>
			<div className='split-signup left-signup'>
				<div className='centre-signup'>
					<div className='headText'>
						<div className='head-signup'>
							<Typography className='head-signup' label='Create an Account' fontSize='fontSize36' />
						</div>
						<div className='text-signup'>
							<Typography label='Create your account by filling the form below.' className='text-signup' />
						</div>
					</div>

					<div className='inputForm'>
						<div>
							<Typography label='Email' className='label-login' fontWeightstest={500} fontSize='fontSize14' />
						</div>
						<InputAtom className='input-signup' imageUrlInput={Mail} placeholder='Email Address' />

						<div>
							<Typography label='Enter Password' fontWeightstest={500} className='label-login' fontSize='fontSize14' />
						</div>
						<div className='input-signup'>
							<InputAtom placeholder='Password' type='password' />
						</div>
						<div className='checkbox-signup'>
							<div className='container-radio-signup'>
								<RadioButton name='termsConditions' className='checkbox-label-signup' checked={tncBox} onChange={handleTncChange} />
								<Typography className='checkbox-label-signup' label={conditionText} fontWeightstest={500} lineHeight='16.8px' fontSize='fontSize14' />
							</div>
						</div>
						<div>
							<Button className='signup-signup' label='Signup' />
						</div>
					</div>

					<div className='line-signup'>
						<hr className='linehalf' />
						<Typography className='linename' label='or Signup with' />
						<hr className='linehalf' />
					</div>

					<div className='auto-signup'>
						<Button className='autobutton' img={Google} label='Sign In with Google' />
						<Button className='autobutton' img={Apple} label='Sign In with Apple' />
					</div>

					<div className='bottom'>
						<Typography className='bottomtext' label='Already have a account?' />
						<Typography className='highlight-check' label='Log In' onClick={handleLogInClick} />
					</div>
				</div>
			</div>
			<div className='split-signup right-signup'>
				<div className='centre-signup'>
					<div className='vectorimg'>
						<Slider images={images} autoPlay interval={3000} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
