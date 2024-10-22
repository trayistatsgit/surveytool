import React from 'react';
import '../SignUp.scss';
import { InputAtom } from '../../../blocks/input/Input';
import Mail from '../../../assets/signup-img/Mail.svg';
import Slide1 from '../../../assets/signup-img/Slide1.svg';
import Image82 from '../../../assets/signup-img/Image82.svg';
import { Typography } from '../../../blocks';
import { Button } from '../.././../blocks/button/ButtonAtom';
import Slider from '../../../blocks/slider/Slider';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

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

	return (
		<div className='container-signup'>
			<div className='split-signup left-signup'>
				<button className='back-button' onClick={handleBackClick}>
					<span className='back-arrow'>&#8249;</span>
					<Typography label='Back' className='back-button' lineHeight='18.75px' fontWeightstest={500} fontSize='fontSize14' />
				</button>

				<div className='centre-signup'>
					<div className='headText'>
						<div className='head-forgot'>
							<Typography
								className='head-forgot'
								fontWeightstest={600}
								lineHeight='24px'
								label='Forgot your password?'
								fontSize='fontSize30'
							/>
						</div>
						<div className='text-forgot'>
							<Typography label='Please enter your email id we will send you the link to your email id.' className='text-forgot' />
						</div>
					</div>

					<div className='inputForm'>
						<div>
							<Typography label='Email' className='label-forgot' fontWeightstest={500} fontSize='fontSize14' />
						</div>
						<InputAtom className='input-signup' imageUrlInput={Mail} placeholder='Email Address' />

						<div>
							<Button className='forgot-button' label='Continue' />
						</div>
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

export default ForgotPassword;
