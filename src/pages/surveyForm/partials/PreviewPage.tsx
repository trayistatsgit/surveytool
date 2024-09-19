// // src/components/Preview.tsx
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../partials/SurveyPage.scss';


// interface Question {
//   id: number;
//   questionText: string;
//   questionType: string;
//   options?: string[];
// }

// const Preview: React.FC = () => {
//   const location = useLocation();
//   const { questions }: { questions: Question[] } = location.state || { questions: [] };

//   return (
//     <div>
//       <h2>Survey Preview</h2>
//       {questions.length > 0 ? (
//         questions.map((q) => (
//           <div key={q.id} className="question-preview">
//             <strong>Question:</strong> {q.questionText}
//             <div className="options-preview">
//               {q.questionType === 'dropdown' && q.options && (
//                 <select>
//                   {q.options.map((option, idx) => (
//                     <option key={idx} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {q.questionType === 'multipleChoice' &&
//                 q.options &&
//                 q.options.map((option, idx) => (
//                   <div key={idx}>
//                     <input type="checkbox" id={`mc-${q.id}-${idx}`} />
//                     <label htmlFor={`mc-${q.id}-${idx}`}>{option}</label>
//                   </div>
//                 ))}

//               {q.questionType === 'radio' &&
//                 q.options &&
//                 q.options.map((option, idx) => (
//                   <div key={idx}>
//                     <input type="radio" name={`radio-${q.id}`} id={`radio-${q.id}-${idx}`} />
//                     <label htmlFor={`radio-${q.id}-${idx}`}>{option}</label>
//                   </div>
//                 ))}

//               {q.questionType === 'text' && <input type="text" placeholder="Text input preview" />}
//               {q.questionType === 'textarea' && <textarea placeholder="Textarea input preview"></textarea>}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No questions available for preview.</p>
//       )}
//     </div>
//   );
// };

// export default Preview;
