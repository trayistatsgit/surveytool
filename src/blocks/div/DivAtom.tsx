import React from 'react';
import './Div.scss';
import clsx from 'clsx';

interface DivProps {
  [key: string]: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const Div: React.FC<DivProps> = ({ className, children, ...props }) => {
  const classNames = Object.keys(props)
    .filter((prop) => prop.startsWith('grid-'))
    .map((prop) => `grid-${prop.split('-')[1]}`)
    .join(' ');

  return <div className={clsx(classNames, className)}>{children}</div>;
};
