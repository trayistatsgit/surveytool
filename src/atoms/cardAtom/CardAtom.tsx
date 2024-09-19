import React from 'react';
import { NavLink } from 'react-router-dom';
import './CardAtom.scss';
import { Typography } from '../../blocks/typography/TypographyAtom';

interface CardAtomProps {
  imgScr?: string;
  Heading?: string;
  Description?: string;
  linkTo?: string; // New prop for link
}

const CardAtom: React.FC<CardAtomProps> = ({
  imgScr,
  Heading,
  Description,
  linkTo = '/', // Default path if no link is provided
}) => {
  return (
    <NavLink to={linkTo} className='Main_cardInfo'> {/* Wrap the card with NavLink */}
      <div className='Card_info'>
        <div className='Card-img'>
          <img src={imgScr} alt='NotFound' className='Img-info' />
        </div>
        <div className='Card-heading'>
          <Typography
            fontSize='fontSize16'
            fontWeight='semiBold'
            fontWeightstest={500}
            label={Heading}
          />
        </div>
        <div className='Card-description'>
          <Typography
            fontSize='fontSize14'
            fontWeight='bold'
            fontWeightstest={300}
            lineHeight='lineHeight22'
            label={Description}
          />
        </div>
      </div>
    </NavLink>
  );
};

export default CardAtom;
