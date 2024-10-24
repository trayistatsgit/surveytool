import React from 'react';
import { Outlet } from 'react-router-dom';
import useStickyNavbar from '../customHooks/useStickyNavbar';
import NavbarHome from '../components/navbar/NavbarHome';
import SignUp from '../pages/auth/SignUp';

const MasterLayout: React.FC = () => {
	const { scrollContainerRef, isScrolled } = useStickyNavbar(10);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'white' }}>
			<div
				ref={scrollContainerRef}
				style={{
					flex: '1',
					overflowY: 'auto',
					overflowX: 'hidden',
				}}>
				<NavbarHome isScrolled={isScrolled} />
				<SignUp />
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MasterLayout;
