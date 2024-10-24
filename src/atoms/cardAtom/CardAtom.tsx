import React from 'react';
import './CardAtom.scss';
import { Typography } from '../../blocks/typography/TypographyAtom';

interface CardAtomProps {
  imgScr?: string;
  Heading?: string;
  Description?: string;
  linkTo?: string;
  onClick?: () => void; // Add onClick prop
}

const CardAtom: React.FC<CardAtomProps> = ({ imgScr, Heading, Description, onClick }) => {
  return (
    <div className='Main_cardInfo' onClick={onClick}>
      <div className='Card_info'>
        <div className='Card-img'>
          <img src={imgScr} alt='NotFound' className='Img-info' />
        </div>
        <div className='Card-heading'>
          <Typography fontSize='fontSize16' fontWeight='semiBold' fontWeightstest={500} label={Heading} />
        </div>
        <div className='Card-description'>
          <Typography fontSize='fontSize14' fontWeight='bold' fontWeightstest={300} lineHeight='lineHeight22' label={Description} />
        </div>
      </div>
    </div>
  );
};

export default CardAtom;
