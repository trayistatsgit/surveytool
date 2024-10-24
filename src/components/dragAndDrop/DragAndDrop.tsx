import React, { useState } from 'react';
import './DragAndDrop.scss';

interface DragAndDropProps {
	// eslint-disable-next-line no-unused-vars
	onFileUpload: (fileURL: string) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onFileUpload }) => {
	const [dragOver, setDragOver] = useState(false);
	const [fileURL, setFileURL] = useState<string | null>(null);
	const [error, setError] = useState('');

	const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];

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
		const droppedFile = e.dataTransfer.files[0] as File;
		validateFile(droppedFile);
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = e.target.files?.[0] as File;
		validateFile(uploadedFile);
	};

	const validateFile = (selectedFile: File) => {
		if (supportedFormats.includes(selectedFile.type)) {
			const fileReader = new FileReader();
			fileReader.onload = () => {
				const uploadedFileURL = fileReader.result as string;
				setFileURL(uploadedFileURL);
				onFileUpload(uploadedFileURL);
				setError('');
			};
			fileReader.readAsDataURL(selectedFile);
		} else {
			setFileURL(null);
			setError('Unsupported file format. Please upload a JPG, GIF, or PNG file.');
		}
	};

	return (
		<div className='popupOverlay'>
			<div className='popUpContainer'>
				<section className='headSection'>
					<b>FROM COMPUTER</b>
				</section>
				<section className='bodySection'>
					<div
						className={`bodyContainer ${dragOver ? 'dragOver' : ''}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}>
						{fileURL ? (
							<img src={fileURL} alt='Uploaded File' className='uploadedImage' />
						) : (
							<p className='bodyPopPara1'>Drag and drop a file here</p>
						)}
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
							<input type='file' id='fileUpload' style={{ display: 'none' }} onChange={handleFileUpload} />
						</p>

						{error && (
							<div className='errorMessage'>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='red' width='24px' height='24px'>
									<path d='M0 0h24v24H0z' fill='none' />
									<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
								</svg>
								<span>{error}</span>
							</div>
						)}
					</div>
				</section>
			</div>
		</div>
	);
};

export default DragAndDrop;
