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
 
    const handleClick = () => {
        navigate('/sign-up');
    };
 
    const handleLogin = () => {
        navigate('/login');
    };
 
    // const handleCreateSurvey = () => {
    //     navigate('/create-survey');
    // };
 
   
const handleStartPage = () => {
    navigate('/start');
};
 
    return (
        <><div className={isScrolled ? 'stickyParentNavDiv' : 'parentNavDiv'}>
            <nav className={isScrolled ? 'sticky-nav' : 'navbar'}>
                <div className={isScrolled ? 'sticky-nav-container' : 'navbar-container'}>
                    <div className='navbar-logo'>
                        <img className='img' alt='logo' src={logo} onClick={handleLogoRedirect} />
                        <ul className='nav-menu'>
                            <li className='nav-item'>
                                Services
 
                            </li>
                            <li className='nav-item'>
                                Company
 
                            </li>
                            <li className='nav-item'>Contact Us</li>
                        </ul>
                    </div>
                    <div className='nav-actions'>
                        <li className='nav-item' onClick={handleLogin}>
                            Login
                        </li>
                        <Button label='Get Started' className='button' reverse={true} onClick={handleClick} />
                        <Button label='Create survey' className='button' reverse={true} onClick={handleStartPage} />
 
                    </div>
                </div>
            </nav>
        </div></>
    );
};
 
export default NavbarHome;
 
 
 
import React from 'react'; import { createB... by Shivam Singh
Shivam Singh
10:03 am
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import SignUp from '../pages/auth/SignUp';
import LogIn from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword/ForgotPassword';
import CreateSurvey from '../pages/createSurvey/CreateSurvey';
import StartingPage from '../pages/startingPage/StartingPage';
 
const router = createBrowserRouter([
    {
        path: '/',
        element: <MasterLayout />,  
        children: [
            {
                path: '/start',
                element: <StartingPage />,
            },
       
            {
                path:'create-survey',
                element:<CreateSurvey />
            }
           
        ],
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <LogIn />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
]);
 
export default router;
 
import React from 'react'; import CardAtom ... by Shivam Singh
Shivam Singh
10:05 am
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
                    linkTo='/create-survey' // Specify the path you want to navigate to
                />
            </div>
        </div>
    );
};
 
export default StartingPage;