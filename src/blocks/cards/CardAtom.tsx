// import React from 'react';
// import { Button } from '../button/ButtonAtom';
// import { Typography } from '../typography/TypographyAtom';
// //import {Container} from '../container/ContainerAtom'
// // import { Div } from '../div/DivAtom';
// import { twocoins, clock } from '../../assets/survey-image/index';
// import './Card.scss';

// interface CardProps {
// 	id?: any;
// 	label?: string;
// 	loi?: number;
// 	points?: number;
// 	deviceType?: string;
// 	onclick?: any;
// 	link?: string;
// }
// // interface DeviceType {
// // 	isMobile: number;
// // 	isTablet: number;
// // 	isLaptop: number;
// // }
// const SurveyCardAtom: React.FC<CardProps> = ({ id, label, loi, points, onclick, link }) => {
// 	// Update deviceValue based on the deviceTypeArr
// 	// const deviceTypeArr: number[] = deviceType ? deviceType.split(',').map((item: string) => Number(item.trim())) : [];
// 	// const deviceValue: DeviceType = {
// 	// 	isMobile: 0,
// 	// 	isTablet: 0,
// 	// 	isLaptop: 0,
// 	// };
// 	// Update deviceValue based on the deviceTypeArr
// 	// deviceTypeArr.forEach((type) => {
// 	// 	switch (type) {
// 	// 		case 1:
// 	// 			deviceValue.isMobile = 1;
// 	// 			break;
// 	// 		case 2:
// 	// 			deviceValue.isTablet = 1;
// 	// 			break;
// 	// 		case 3:
// 	// 			deviceValue.isLaptop = 1;
// 	// 			break;
// 	// 		case 4:
// 	// 			deviceValue.isMobile = 1;
// 	// 			deviceValue.isTablet = 1;
// 	// 			deviceValue.isLaptop = 1;
// 	// 			break;
// 	// 		default:
// 	// 			deviceValue.isMobile = 1;
// 	// 			deviceValue.isTablet = 1;
// 	// 			deviceValue.isLaptop = 1;
// 	// 	}
// 	// });

// 	return (
// 		<div className='card-survey'>
// 			<div className='firstelement'>
// 				<Typography className='survey-id' label={`${id}`} textColor='primary' fontWeight='medium' fontSize='fontSize20' />
// 				<div className='loi-clock'>
// 					<img src={clock} alt='clock' />
// 					<Typography className='loi-time' label={`${loi} Min`} textColor='primary' fontSize='fontSize20' />
// 				</div>
// 			</div>
// 			<div className='secondelement'>
// 				<div className='secondelement-subpart'>
// 					<img src={twocoins} alt='twocoins' />
// 					<Typography className='survey-points' label={points ? points.toFixed() : 0} textColor='primary' fontWeight='medium' fontSize='fontSize20' />
// 				</div>
// 				<Button label={label} onClick={() => onclick(link, loi)} className='surveystart-btn' variant='surveyprimary' />
// 			</div>
// 		</div>
// 	);
// };

// export default SurveyCardAtom;
