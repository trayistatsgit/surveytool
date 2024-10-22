/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import './SignUp.scss';
import { InputAtom } from '../../blocks/input/Input';
import '../../assets/signup-img';
import Apple from '../../assets/signup-img/Apple.svg';
import Google from '../../assets/signup-img/Google.svg';
import Mail from '../../assets/signup-img/Mail.svg';
import Slide1 from '../../assets/signup-img/Slide1.svg';
import Image82 from '../../assets/signup-img/Image82.svg';
import { Typography } from '../../blocks';
import { Button } from '../../blocks/button/ButtonAtom';
import Slider from '../../blocks/slider/Slider';
import { logo } from '../../assets/signup-img';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../../redux/slice/auth/login';
import RadioButton from '../../atoms/RadioButton/RadioButton';
import { useDispatch } from 'react-redux';

const LogIn: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [rememberMe, setRememberMe] = useState(false);
	const images = [
		{
			src: Slide1,
			heading: 'Turn Data into Decisions',
			text: 'Unleashing Potential through Precision',
		},
		{
			src: Image82,
			heading: 'Turn Data into Decisions',
			text: 'This is the text for Slide 2',
		},
		{
			src: Slide1,
			heading: 'Turn Data into Decisions',
			text: 'This is the text for Slide 3',
		},
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		if (type === 'checkbox') {
			setRememberMe(checked);
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/dashboard');
	};
	const getQuestions = async () => {
		const querydata = { formData };
		// eslint-disable-next-line no-unused-vars
		dispatch(loginThunk(querydata));
	};
	useEffect(() => {
		getQuestions();
	}, [formData]);

	return (
		<div className='container-signup'>
			<div className='split-signup left-signup'>
				<div className='centre-signup'>
					<div className='headText'>
						<div className='head-login'>
							<Typography className='head-login' label='Welcome Survey Tools' fontSize='fontSize36' />
							<img src={logo} className='logo-login' alt='Logo' />
						</div>
						<Typography label='Market Research Operations Experts' className='text-signup' />
					</div>

					<form className='inputForm' onSubmit={handleSubmit}>
						<label htmlFor='email' className='label-login'>
							<Typography label='Email' fontWeightstest={500} fontSize='fontSize14' />
						</label>
						<InputAtom
							className='input-signup'
							imageUrlInput={Mail}
							placeholder='Email Address'
							name='email'
							value={formData.email}
							onChange={handleChange}
						/>

						<label htmlFor='password' className='label-login'>
							<Typography label='Password' fontWeightstest={500} fontSize='fontSize14' />
						</label>
						<InputAtom
							className='input-signup'
							type='password'
							placeholder='Password'
							name='password'
							value={formData.password}
							onChange={handleChange}
						/>

						<div className='justify__space_between'>
							<div className='container-radio'>
								<RadioButton name='rememberMe' checked={rememberMe} onChange={handleChange} />
								<Typography label='Remember me' fontWeightstest={500} fontSize='fontSize14' />
							</div>
							<Typography
								className='forgot__password'
								label='Forgot Password?'
								onClick={() => navigate('/forgot-password')}
								fontWeightstest={500}
								fontSize='fontSize14'
							/>
						</div>

						<Button className='signup-signup' label='Sign In' type='submit' />
					</form>

					<div className='line-signup'>
						<hr className='linehalf' />
						<Typography className='linename' label='or Login with' />
						<hr className='linehalf' />
					</div>

					<div className='auto-signup'>
						<Button className='autobutton' img={Google} label='Sign In with Google' />
						<Button className='autobutton' img={Apple} label='Sign In with Apple' />
					</div>

					<div className='bottom'>
						<Typography className='bottomtext' label='Don’t have an account?' />
						<Typography className='highlight-check' label='Sign Up' onClick={() => navigate('/sign-up')} />
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

export default LogIn;
