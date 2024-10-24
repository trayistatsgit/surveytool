import React, { useEffect, useState } from 'react';
import './LogoCreateSurvey.scss';
import { Button } from '../../../blocks';
import PopupComponent from '../../../atoms/popup/Popup';
import DragAndDrop from '../../../components/dragAndDrop/DragAndDrop';
interface ILogoCreate {
  onLogoUpload: React.Dispatch<React.SetStateAction<File | null>>;
  surveyLogo: string | null;
}
const LogoCreateSurvey: React.FC<ILogoCreate> = ({ onLogoUpload, surveyLogo = null }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const showPopup = () => setIsPopUpVisible(true);
  const closePopup = () => setIsPopUpVisible(false);
  useEffect(() => {
    setUploadedLogo(surveyLogo);
  }, [surveyLogo]);
  const handleFileUpload = (fileURL: string) => {
    setUploadedLogo(fileURL);
    onLogoUpload(fileData);
    closePopup();
  };

  const deleteLogo = () => {
    setUploadedLogo(null);
    onLogoUpload(null);
  };
  return (
    <div className='addLogoHere'>
      {uploadedLogo ? (
        <>
          <img src={uploadedLogo ?? ''} alt='Uploaded Logo' className='uploadedLogo' />
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
          <DragAndDrop onFileUpload={handleFileUpload} setFileData={setFileData} />
        </PopupComponent>
      )}
    </div>
  );
};

export default LogoCreateSurvey;
