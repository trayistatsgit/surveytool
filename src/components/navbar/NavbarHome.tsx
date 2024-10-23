// NavbarHome.tsx:
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../navbar/navbar.scss';
import '../publicHome/home.scss';
import { Button } from '../../blocks';
import { logo } from '../../assets/signup-img';

interface NavTestProps {
	isScrolled: boolean;
}

const NavbarHome: React.FC<NavTestProps> = ({ isScrolled }) => {
	const navigate = useNavigate();

	const handleLogoRedirect = () => {
		navigate('/');
	};
	const handleStartPage = () => {
		navigate('/start');
	};
	const handleSurveyEditCard = () => {
		// navigate('/edit-survey')
		navigate('/my-surveys');
	};
	// const handleNavigation = () => {
	// 	localStorage.setItem('showBreadcrumb', JSON.stringify(false));
	// 	window.dispatchEvent(new Event('storage'));
	// 	navigate('/');
	// };
	const handleNavigationSurvey = () => {
		localStorage.setItem('showBreadcrumb', JSON.stringify(false));
		window.dispatchEvent(new Event('storage'));
	};

	return (
		<>
			<div className={isScrolled ? 'stickyParentNavDiv' : 'parentNavDiv'}>
				<nav className={isScrolled ? 'sticky-nav' : 'navbar'}>
					<div className={isScrolled ? 'sticky-nav-container' : 'navbar-container'}>
						<div className='navbar-logo'>
							<img className='img' alt='logo' src={logo} onClick={handleLogoRedirect} />
							<ul className='nav-menu'>
								<li
									className='nav-item'
									onClick={() => {
										handleSurveyEditCard();
										handleNavigationSurvey();
									}}>
									Surveys
								</li>
							</ul>
						</div>
						<div className='nav-actions'>
							{/* <Button label='Get Started' className='button' reverse={true} onClick={handleClick} /> */}
							<Button label='Create survey' className='button' reverse={true} onClick={handleStartPage} />
						</div>
					</div>
				</nav>
			</div>
		</>
	);
};

export default NavbarHome;
