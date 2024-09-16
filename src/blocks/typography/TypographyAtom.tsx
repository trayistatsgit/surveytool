import './Typography.scss';
import React from 'react';
import clsx from 'clsx';

export const fontSizes = {
  fontSize12: 'fontSize12',
  fontSize14: 'fontSize14',
  fontSize16: 'fontSize16',
  fontSize18: 'fontSize18',
  fontSize20: 'fontSize20',
  fontSize24: 'fontSize24',
  fontSize30: 'fontSize30',
  fontSize32: 'fontSize32',
  fontSize36: 'fontSize36',
  fontSize40: 'fontSize40',
  fontSize45: 'fontSize45', 
  fontSize58: 'fontSize58',
  fontSize68: 'fontSize68',
};


export const fontWeights = {
  regular: 'regular',
  medium: 'medium',
  semiBold: 'semiBold',
  bold: 'bold',
  dimmer: 'dimmer',
};


export const fontWeightstext = {
  regular: 'font-weight-400',
  medium: 'font-weight-500',
  semiBold: 'font-weight-600',
  bold: 'font-weight-700',
};


export const lineHeights = {
  base: 'line-height-base',
  small: 'line-height-small',
  large: 'line-height-large',
  lineHeight24: 'lineHeight24',
  lineHeight22: 'lineHeight22',
};


export const textColors = {
  primary: 'textColor-primary',
  blue: 'textColor-blue',
  white: 'textColor-white',
  success: 'textColor-success',
  orange: 'textColor-orange',
  redAlert: 'textColor-redAlert',
  lightBlack: 'textColor-lightBlack',
  black: 'textColor-black',
};


export type PropsType = React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> & {
  label?: React.ReactNode;
  fontSize?: keyof typeof fontSizes;
  fontWeight?: keyof typeof fontWeights;
  fontWeightstest?: number; 
  lineHeight?: string | number; 
  textColor?: keyof typeof textColors;
  className?: string;
  isSpan?: boolean;
  fontFamily?: string; 
};


export const Typography: React.FC<PropsType> = ({
  fontSize = 'fontSize12',
  fontWeight = 'regular',
  fontWeightstest,
  lineHeight = 'base',
  textColor = 'primary',
  className,
  isSpan = false,
  fontFamily = 'Poppins', 
  ...props
}) => {
  
  const fontWeightClass = fontWeightstest
    ? undefined 
    : fontWeightstext[fontWeight] || '';

  const lineHeightClass = typeof lineHeight === 'string' && lineHeights[lineHeight]
    ? lineHeights[lineHeight]
    : '';

  const customLineHeight = typeof lineHeight === 'number' || (typeof lineHeight === 'string' && !lineHeightClass)
    ? lineHeight
    : undefined;

  const fontSizeClass = fontSizes[fontSize] || '';

  return (
    <>
      {isSpan === false ? (
        <div
          className={clsx(
            fontSizeClass,
            fontWeightClass,
            lineHeightClass,
            textColors[textColor],
            className
          )}
          style={{ fontFamily, fontWeight: fontWeightstest, lineHeight: customLineHeight }}
          {...props} 
        >
          {props.label}
        </div>
      ) : (
        <span
          className={clsx(
            fontSizeClass,
            fontWeightClass,
            lineHeightClass,
            textColors[textColor],
            className
          )}
          style={{ fontFamily, fontWeight: fontWeightstest, lineHeight: customLineHeight }}
          {...props} 
        >
          {props.label}
        </span>
      )}
    </>
  );
};
