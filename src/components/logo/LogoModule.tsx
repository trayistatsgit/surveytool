import * as React from 'react';
import { Typography } from '../../blocks/index';
import './Logo.scss';

export interface LogoProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  button?: string;
}

export const Logo: React.FC<LogoProps> = ({ title }) => {
  return (
    <div className='logo-container'>
      <Typography label={title} fontSize='fontSize24' fontWeight='bold' className='signin-text' />
    </div>
  );
};

Logo.defaultProps = {
  className: '',
  children: undefined,
  title: '',
  button: '',
};
