// TextEditorWithPreview.tsx
import React, { useRef, useState } from 'react';
import './TextEditorForm.scss';

const TextEditorForm: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  // State to store the title and formatted description
  const [pageTitle, setPageTitle] = useState<string>('');
  const [pageDescription, setPageDescription] = useState<string>('Start typing here...');

  // Function to apply text formatting commands
  const formatText = (command: string, value: any | null = null) => {
    document.execCommand(command, false, value);
  };

  // Update the state for the preview in real-time
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageTitle(event.target.value);
  };

  const handleDescriptionChange = () => {
    if (editorRef.current) {
      setPageDescription(editorRef.current.innerHTML);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Title:', pageTitle);
    console.log('Description:', pageDescription);
  };

  return (
    <div className="form-preview-container">
      {/* Form Section */}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="editor-form">
          {/* Page Title Input */}
          <label htmlFor="pageTitle">Page Title</label>
          <input
            type="text"
            id="pageTitle"
            name="pageTitle"
            placeholder="Enter page title"
            maxLength={100}
            onChange={handleTitleChange}
          />

          {/* Page Description with Toolbar */}
          <label htmlFor="pageDescription">Page Description</label>
          <div className="toolbar">
            <button type="button" onClick={() => formatText('bold')}><b>B</b></button>
            <button type="button" onClick={() => formatText('italic')}><i>I</i></button>
            <button type="button" onClick={() => formatText('underline')}><u>U</u></button>
            <button type="button" onClick={() => formatText('strikeThrough')}><s>S</s></button>
            <button type="button" onClick={() => formatText('insertOrderedList')}>OL</button>
            <button type="button" onClick={() => formatText('insertUnorderedList')}>UL</button>
            <button type="button" onClick={() => formatText('justifyLeft')}>Left</button>
            <button type="button" onClick={() => formatText('justifyCenter')}>Center</button>
            <button type="button" onClick={() => formatText('justifyRight')}>Right</button>
            <button
              type="button"
              onClick={() => formatText('createLink', prompt('Enter URL:', 'https://'))}
            >Link</button>
            <button type="button" onClick={() => formatText('unlink')}>Unlink</button>
          </div>

          {/* Content Editable Page Description */}
          <div
            ref={editorRef}
            id="pageDescription"
            className="editor"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={handleDescriptionChange}
          >
            Start typing here...
          </div>

          {/* Submit Button */}
          <button type="submit" className="save-button">Save</button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="preview-container">
        <h3>Live Preview</h3>
        <div className="preview-title">{pageTitle}</div>
        <div
          className="preview-description"
          dangerouslySetInnerHTML={{ __html: pageDescription }}
        />
      </div>
    </div>
  );
};

export default TextEditorForm;
