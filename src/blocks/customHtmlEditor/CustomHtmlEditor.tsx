// import React, { useRef, useEffect } from 'react';
// import './CustomHtmlEditor.scss';

// interface CustomHtmlEditorProps {
//   htmlContent?: string;
//   onSave?: (content: string) => void;
// }

// const CustomHtmlEditor: React.FC<CustomHtmlEditorProps> = ({ htmlContent = '', onSave }) => {
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (editorRef.current) {
//       editorRef.current.innerHTML = htmlContent;
//     }
//   }, [htmlContent]);

//   const formatText = (command: string, value?: string) => {
//     document.execCommand(command, false, value);
//   };

//   const insertHeading = (headingType: string) => {
//     document.execCommand('formatBlock', false, headingType);
//   };

//   const insertImage = () => {
//     const url = prompt('Enter image URL');
//     if (url) {
//       document.execCommand('insertImage', false, url);
//     }
//   };

//   const saveContent = () => {
//     if (onSave && editorRef.current) {
//       onSave(editorRef.current.innerHTML);
//     }
//   };

//   return (
//     <div className="custom-html-editor">
//       <div className="toolbar">
//         <button onClick={() => formatText('bold')}><b>B</b></button>
//         <button onClick={() => formatText('italic')}><i>I</i></button>
//         <button onClick={() => formatText('underline')}><u>U</u></button>
//         <button onClick={() => formatText('strikeThrough')}><s>S</s></button>
//         <button onClick={() => formatText('createLink', prompt('Enter URL:'))}>Link</button>
//         <button onClick={insertImage}>Image</button>
//         <button onClick={() => insertHeading('h1')}>H1</button>
//         <button onClick={() => insertHeading('h2')}>H2</button>
//         <button onClick={() => insertHeading('h3')}>H3</button>
//         <button onClick={() => formatText('insertUnorderedList')}>• List</button>
//         <button onClick={() => formatText('insertOrderedList')}>1. List</button>
//         <button onClick={saveContent}>Save</button>
//       </div>
//       <div id="editor" contentEditable={true} ref={editorRef}>
//         Start writing your content here...
//       </div>
//     </div>
//   );
// };

// export default CustomHtmlEditor;
