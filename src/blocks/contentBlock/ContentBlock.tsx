import React from 'react';
import { Typography } from '../../blocks/typography/TypographyAtom';
import './ContentBlock.scss';

interface ContentBlockProps {
  heading: string;
  description: string;
  className?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ heading, description, className = '' }) => {
  return (
    <div className={`content-block ${className}`}>
      <Typography
        className='team-heading'
        fontSize='fontSize45'
        textColor='black'
        fontWeight='bold'
        fontWeightstest={700}
        lineHeight='68px'
        label={heading}
      />
      <Typography
        className='team-description'
        fontSize='fontSize16'
        textColor='black'
        fontWeight='medium'
        fontWeightstest={500}
        lineHeight='24px'
        label={description}
      />
    </div>
  );
};

export default ContentBlock;
