import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import useStickyNavbar from '../customHooks/useStickyNavbar';
import NavbarHome from '../components/navbar/NavbarHome';
import SurveyBreadCrumb from '../atoms/surveybreadcrumb/SurveyBreadCrumb';

const MasterLayout = () => {
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
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MasterLayout;
