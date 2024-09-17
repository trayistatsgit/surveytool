// NavbarHome.tsx:
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../navbar/navbar.scss';
import '../publicHome/home.scss';
import { Button } from '../../blocks';
import { logo } from '../../assets/signup-img';
import TextEditorForm from '../../components/textEditorForm/TextEditorForm';
 
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

    const handleCreateSurvey = () => {
        navigate('/create-survey');
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
                        <Button label='Create Survey' className='button' reverse={true} onClick={handleCreateSurvey} />
                    </div>
                </div>
            </nav>
        </div>
        <div className="App">
                <h1>Create a New Page</h1>
                <TextEditorForm />
            </div>
            

            </>
    );
};
 
export default NavbarHome;
 
 