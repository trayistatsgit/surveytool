import React, { useEffect, useRef } from 'react';
import './Popup.scss';
import cancel from '../../assets/cancel.svg';

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
  width: number;
  height?: number;
  cokiee?: boolean;
  clickOut?: boolean;
  skipEffect?: boolean;
  showBottomCancel?: boolean; // New prop to control the visibility of the bottom cancel button
}

const PopupComponent: React.FC<PopupProps> = ({
  children,
  onClose,
  width,
  height,
  cokiee = false,
  clickOut = false,
  skipEffect = false,
  showBottomCancel = false, // Default to false
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skipEffect && !clickOut) {
      const handleOutsideClick = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [onClose, clickOut, skipEffect]);

  return (
    <div className={`${cokiee ? 'popup-overlay' : 'popup-overlay'}`}>
      <div
        ref={popupRef}
        className={`${cokiee ? 'popup-content-cokiee' : 'popup-content'}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <img
          src={cancel}
          onClick={onClose}
          className={`${cokiee ? 'cancel-img-cokiee' : 'cancel-img'}`}
          alt='Cancel'
        />
        {children}

        {/* Bottom Cancel Button */}
        {showBottomCancel && (
          <button
            className='bottom-cancel-button'
            onClick={onClose} // Uses the onClose function passed in props
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default PopupComponent;
