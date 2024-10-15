import { Button, InputAtom, Typography } from '../../blocks/index';
import React, { useState } from 'react';

// Define the props interface
interface NewTextEditorProps {
	label?: string; // Optional initial label text
	onSave: (label: string) => void; // Function to handle save action
	onCancel: () => void; // Function to handle cancel action
}

const NewTextEditor: React.FC<NewTextEditorProps> = ({ label = 'Untitled', onSave, onCancel }) => {
	const [labelText, setLabelText] = useState<string>(label); // Initialize state with label prop

	const handleSave = () => {
		onSave(labelText); // Call onSave with the current labelText
		console.log('Saved:', labelText);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLabelText(e.target.value); // Update labelText with the input value
	};

	return (
		<div>
			<Typography label={labelText} /> {/* Use labelText in Typography */}
			<InputAtom onChange={handleChange} value={labelText} />
			<Button label='Save' variant='gray' onClick={handleSave} />
			<Button label='Cancel' variant='blue' onClick={onCancel} />
		</div>
	);
};

export default NewTextEditor;
