
import React,{useState,useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import useStickyNavbar from '../customHooks/useStickyNavbar';
import NavbarHome from '../components/navbar/NavbarHome';
import SurveyBreadCrumb from '../atoms/surveybreadcrumb/SurveyBreadCrumb';

const MasterLayout = () => {
	const { scrollContainerRef, isScrolled } = useStickyNavbar(10);
	const [showBreadcrumbs, setShowBreadcrumbs] = useState<boolean>(false);
	

	const updateBreadcrumbs = () => {
        const storedValue = localStorage.getItem('showBreadcrumb');
        const items = JSON.parse(storedValue || 'false');
        setShowBreadcrumbs(items);
    };
  useEffect(() => {
	updateBreadcrumbs(); 

	window.addEventListener('storage', updateBreadcrumbs);

	return () => {
		window.removeEventListener('storage', updateBreadcrumbs); 
	};
}, []);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh',backgroundColor: 'white' }}>
			<div
				ref={scrollContainerRef}
				style={{
					flex: '1',
					overflowY: 'auto',
					overflowX: 'hidden',
				}}>
					<NavbarHome isScrolled={isScrolled} />
					{showBreadcrumbs &&<SurveyBreadCrumb/>}

				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MasterLayout;


