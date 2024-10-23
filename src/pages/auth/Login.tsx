import React, { useState, ChangeEvent } from 'react';
import './SignUp.scss';
// import { loginPage } from '../../redux/slice/auth/loginPage';
import { InputAtom } from '../../blocks/input/Input';
import Apple from '../../assets/signup-img/Apple.svg';
import Google from '../../assets/signup-img/Google.svg';
import Mail from '../../assets/signup-img/Mail.svg';
import Slide1 from '../../assets/signup-img/Slide1.svg';
import Image82 from '../../assets/signup-img/Image82.svg';
import { Typography } from '../../blocks';
import { Button } from '../../blocks/button/ButtonAtom';
import Slider from '../../blocks/slider/Slider';
import logo from '../../assets/signup-img/logo.svg'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../../redux/store';
import RadioButton from '../../atoms/RadioButton/RadioButton';
const LogIn: React.FC = () => {
	const navigate = useNavigate();
	// const dispatch = useAppDispatch();
	const [formData, setFormData] = useState({ email: '', password: '' });

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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	console.log('Form submitted:', formData);
	// };
	// useEffect(() => {
	// 	const loginform = async () => {
	// 		const queryData = { formData };

	// 		const Result = (await dispatch(loginPage(queryData))) as any;
	// 	};

	// 	loginform();
	// }, [formData, dispatch]);
	const handleSignInClick = () => navigate('/sign-up');
	const handleForgotClick = () => navigate('/forgot-password');

	return (
		<div className='container-signup'>
			<div className='split-signup left-signup'>
				<div className='centre-signup'>
					<div className='headText'>
						<div className='head-login'>
							<Typography className='head-login' label='Welcome Survey Tools' fontSize='fontSize36' />
							<img src={logo} className='logo-login' alt='Logo' />
						</div>
						<div className='text-signup'>
							<Typography label='Market Research Operations Experts' className='text-signup' />
						</div>
					</div>

					<form>
						<div className='inputForm'>
							<div>
								<Typography label='Email' className='label-login' fontWeightstest={500} fontSize='fontSize14' />
							</div>
							<InputAtom
								className='input-signup'
								imageUrlInput={Mail}
								placeholder='Email Address'
								name='email'
								onChange={handleChange}
								value={formData.email}
							/>

							<div>
								<Typography label='Password' fontWeightstest={500} className='label-login' fontSize='fontSize14' />
							</div>
							<InputAtom
								className='input-signup'
								placeholder='Password'
								type='password'
								name='password'
								onChange={handleChange}
								value={formData.password}
							/>

							<div className='justify__space_between'>
								<div className='container-radio'>
									<RadioButton name='rememberMe' />
									<Typography
										className='remember_me'
										label='Remember me'
										fontWeightstest={500}
										lineHeight='16.8px'
										fontSize='fontSize14'
									/>
								</div>
								<Typography
									className='forgot__password'
									label='Forgot Password?'
									onClick={handleForgotClick}
									fontWeightstest={500}
									lineHeight='16.8px'
									fontSize='fontSize14'
								/>
							</div>

							<Button className='signup-signup' label='Sign In' />
						</div>
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
						<Typography className='highlight-check' label='Sign Up' onClick={handleSignInClick} />
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
