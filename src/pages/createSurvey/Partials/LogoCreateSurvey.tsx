import React, { useState } from 'react';
import './LogoCreateSurvey.scss'; // Add styles if necessary
import { Button } from '../../../blocks';
import PopupComponent from '../../../atoms/popup/Popup';
import DragAndDrop from '../../../components/dragAndDrop/DragAndDrop';

const LogoCreateSurvey: React.FC = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  // Popup functions
  const showPopup = () => setIsPopUpVisible(true);
  const closePopup = () => setIsPopUpVisible(false);

  const handleFileUpload = (fileURL: string) => {
    setUploadedLogo(fileURL);
    closePopup();
  };

  const deleteLogo = () => {
    setUploadedLogo(null);
  };

  return (
    <div className='addLogoHere'>
      {uploadedLogo ? (
        <>
          <img src={uploadedLogo} alt='Uploaded Logo' className='uploadedLogo' />
          <div className='logoEditDeleteButton'>
            <Button className='createEditLogo' onClick={showPopup} label='Edit' />
            <Button className='createRemoveLogo' onClick={deleteLogo} label='Delete' />
          </div>
        </>
      ) : (
        <button className='addLogoBtn' onClick={showPopup}>
          Logo
        </button>
      )}

      {isPopUpVisible && (
        <PopupComponent showBottomCancel={true} onClose={closePopup} width={600} height={400}>
          <DragAndDrop onFileUpload={handleFileUpload} /> {/* Pass the handler */}
        </PopupComponent>
      )}
    </div>
  );
};

export default LogoCreateSurvey;
