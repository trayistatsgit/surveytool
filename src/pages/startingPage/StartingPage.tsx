import React from 'react';
import CardAtom from '../../atoms/cardAtom/CardAtom';
import './StartingPage.scss';

const StartingPage: React.FC = () => {
	return (
		<div>
			<div className='CardAtom'>
				{/* {
                    data.map((card, index) => (
                        <CardAtom key={index} {...card} />
                    ))
                }
  */}

				<CardAtom
					imgScr='https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
					Heading='Start from scratch'
					Description='Begin with a blank survey or form. Then add your questions, text, and images.'
					linkTo='/new-page' // Specify the path you want to navigate to
				/>
			</div>
		</div>
	);
};

export default StartingPage;
