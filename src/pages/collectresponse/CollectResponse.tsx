import React from 'react';
import { Button, Typography } from '../../blocks';
import './CollectResponse.scss';
import TableAtom from '../../atoms/tableAtom/TableAtom';
import { FaUsers } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
const CollectResponse: React.FC = () => {
	const header = ['', 'NICKNAME', 'STATUS', 'RESPONSE', 'DATEMODIFY', ''];
	const rows = [{ nickname: 'Target Audience 1', response: 0, status: 'DRAFT', datemodify: '10/4/2024' }];
	return (
		<div className='main-collect-container'>
			<div className='collect-title'>
				<Typography label='Survey Collectors' fontSize='fontSize20' fontWeightstest={400} fontWeight='regular' />
				<div className='response-button-main'>
					<div className='user-main-container'>
						<FaUsers className='users-icon' />
						<Button className='target-response-btn' label='BUY TARGETED RESPONSE' />
					</div>
					<Button className='add-new-collector' label='ADD NEW COLLECTOR' />
				</div>
			</div>
			<div className='survey-total'>
				<div className='total-response-container'>
					<div className='total-response'>
						<Typography label='Total Response' fontSize='fontSize16' fontWeightstest={300} fontWeight='regular' />
						<Typography className='total-response-count' label='0' fontSize='fontSize30' fontWeightstest={300} fontWeight='regular' />
					</div>
					<div className='response-notification'>
						<Typography label='Response Notification' fontSize='fontSize12' fontWeightstest={200} fontWeight='regular' />
						<Typography
							className='manage-notification'
							label='Manage Notification'
							fontSize='fontSize12'
							fontWeightstest={200}
							fontWeight='regular'
						/>
					</div>
				</div>
				<div className='footer'>
					<Typography
						label='Boost your survey response rate with a custom'
						fontSize='fontSize14'
						fontWeightstest={200}
						fontWeight='regular'
					/>
				</div>
				<div className='sidecorner'></div>

				<IoIosLock className='lock-icon' />
			</div>
			<div className='table-main-container'>
				<TableAtom header={header} rows={rows} />
			</div>
		</div>
	);
};
export default CollectResponse;
