import './ContainerAtom.scss';
import React from 'react';
import clsx from 'clsx';

const variantColors = {
  white: 'white',
  purple: 'purple',
  lightBlue: 'light-blue',
  transparent: 'transparent',
};

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string;
  height?: string;
  className?: string;
  loading?: boolean;
  backgroundColor?: string;
  minHeight?: string;
  variantColor?: keyof typeof variantColors;
};

export const Container: React.FC<ContainerProps> = ({
  height,
  className,
  children,
  loading = false,
  variantColor = 'white',
  backgroundColor,
  minHeight = '10rem',
  ...props
}) => {
  return (
    <div
      className={clsx('containers', variantColors[variantColor], className, {
        loading: loading,
      })}
      style={{
        height,
        backgroundColor: backgroundColor ? backgroundColor : '',
        minHeight: loading ? minHeight : '0rem',
      }}
      {...props}>
      {loading ? <div className='spinner-overlay'></div> : children}
    </div>
  );
};
