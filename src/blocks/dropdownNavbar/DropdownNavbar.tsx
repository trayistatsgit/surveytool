// DropdownNavbar.tsx:
 
 
import React, { useRef, useEffect, useState } from 'react';
import './DropdownNavbar.scss';
import { Typography } from '../../blocks/typography/TypographyAtom';
import { Link } from 'react-router-dom';
 
interface DropdownNavbarProps {
    serviceDropDownData: { img: string; heading: string; text: string; link: string }[];
    onClose: () => void;
}
 
const DropdownNavbar: React.FC<DropdownNavbarProps> = ({ serviceDropDownData, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);
 
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
 
        document.addEventListener('mousedown', handleClickOutside);
 
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
 
    const handleDropdownClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(prevState => !prevState);
    };
    useEffect(() => {
        if (!isOpen) {
            onClose();
        }
    }, [isOpen, onClose]);
 
    if (!isOpen) return null;
 
    return (
        <div className='dropdownNavbar' ref={dropdownRef} onClick={handleDropdownClick}>
            {serviceDropDownData.length &&
                serviceDropDownData.map((item, index: number) => (
                    <Link to={item.link} key={index} className='dropdownLink'> {}
                        <div className='dropdownItem'>
                            <div className='img-heading'>
                                <img className='dropdown-navbar' src={item.img} alt={item.heading} />
                                <Typography className='heading-dropdown' fontSize='fontSize16' lineHeight='24px' fontWeightstest={600} label={item.heading} />
                            </div>
                            <Typography className='dropdown-text' fontSize='fontSize14' lineHeight='24px' fontWeightstest={300} label={item.text} />
                            {index < serviceDropDownData.length - 1 && <hr className='hr-dropdown' />}
                        </div>
                    </Link>
                ))}
        </div>
    );
};
 
export default DropdownNavbar;
 
 