// import React, { useRef, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Sidebar } from '../../components/sidebar/Sidebar';
// import { LoginFooter } from '../../components/footer/loginFooter/LoginFooter';
// import { DashNav } from '../../components/navbar/dashnav/DashNav';
// import './loginLayout.scss';
// import { useAppSelector, useAppDispatch } from '../../redux/store';
// import { closeSideBar } from '../../redux/slices/sidebartoggle/sideBarToggleSlice';

// export const LoginLayout = () => {
// 	const sideBarToggle = useAppSelector((state) => state.sideBarToggleSlice.sideBarToggleSliceData);
// 	//const paginationClick= useAppSelector((state)=>state.sideBarToggleSlice.paginationClick);
// 	const dispatch = useAppDispatch();
// 	const sidebarRef = useRef<HTMLDivElement>(null);

// 	{
// 		/*const handleClickOutside = (event: MouseEvent) => {
// 		if (sidebarRef.current && !paginationClick && !sidebarRef.current.contains(event.target as Node)) {
// 			if (sideBarToggle) {
// 				dispatch(closeSideBar());
// 			}
// 		}
// 	};*/
// 	}

// 	{
// 		/*useEffect(() => {
// 		document.addEventListener('mousedown', handleClickOutside);
// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside);
// 		};
// 	}, [sideBarToggle]);*/
// 	}

// 	const handleClickOutside = (event: MouseEvent) => {
// 		if (window.innerWidth <= 600 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
// 			if (sideBarToggle) {
// 				dispatch(closeSideBar());
// 			}
// 		}
// 	};

// 	useEffect(() => {
// 		if (window.innerWidth <= 600) {
// 			document.addEventListener('mousedown', handleClickOutside);
// 		}
// 		return () => {
// 			if (window.innerWidth <= 600) {
// 				document.removeEventListener('mousedown', handleClickOutside);
// 			}
// 		};
// 	}, [sideBarToggle]);

// 	return (
// 		<div className={sideBarToggle ? `toggler-master-container-login` : `master-container-login`}>
// 			<div ref={sidebarRef} className={sideBarToggle ? `toggler-sidebar` : `sidebar`}>
// 				<Sidebar />
// 			</div>
// 			<div className='main-content'>
// 				<DashNav />
// 				<div className='outlet-container'>
// 					<Outlet />
// 				</div>
// 				<LoginFooter />
// 			</div>
// 		</div>
// 	);
// };
