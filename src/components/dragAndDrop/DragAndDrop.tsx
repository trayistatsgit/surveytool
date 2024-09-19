import React, { useState } from 'react';
import './DragAndDrop.scss';

const DragAndDrop = () => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null); // Correctly type file
  const [error, setError] = useState(''); // State for error handling

  const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];

  // Handle Cancel Button Click (hides the drag-and-drop container)
 
  // Handle Drag and Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0] as File; // Explicitly cast as File
    validateFile(droppedFile);
  };

  // Handle File Selection via Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] as File; // Explicitly cast as File
    validateFile(uploadedFile);
  };

  // Validate the file format
  const validateFile = (selectedFile: File) => {
    if (supportedFormats.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(''); // Clear any previous error
    } else {
      setFile(null);
      setError('Unsupported file format. Please upload a JPG, GIF, or PNG file.');
    }
  };


  return (
    <>
      <div className='popUpContainer'>
        <section className='headSection'>
          <span>FROM COMPUTER</span>
        </section>
        <section className='bodySection'>
          <div
            className={`bodyContainer ${dragOver ? 'dragOver' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className='bodyPopPara1'>
              {file ? `File Selected: ${file.name}` : 'Drag and drop a file here'}
            </p>
            <div className='buttonContainerPopUp'>
              <span className='spanPopupButton'>JPG</span>
              <span className='spanPopupButton'>GIF</span>
              <span className='spanPopupButton'>PNG</span>
            </div>
            <p className='bodyPopPara2'>
              You can also{' '}
              <label htmlFor='fileUpload' className='fileUploadLabel'>
                upload a file from your computer
              </label>
              <input
                type='file'
                id='fileUpload'
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </p>

            {/* Error message with SVG icon */}
            {error && (
              <div className='errorMessage'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='red'
                  width='24px'
                  height='24px'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default DragAndDrop;
