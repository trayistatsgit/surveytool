import React from 'react';
import './GridSection.scss';
// import GridAtom from '../../atoms/GridBoxAtom/GridBoxAtom';

interface Profile {
	name?: string;
	role?: string;
	imgSrc: string;
}
interface ProfileGridSectionBlockProps {
	profiles: Profile[];
}

const ProfileGridSectionBlock: React.FC<ProfileGridSectionBlockProps> = () => {
	return <section className='profile-grid-section-block'>{/* <GridAtom profiles={profiles} /> */}</section>;
};

export default ProfileGridSectionBlock;
