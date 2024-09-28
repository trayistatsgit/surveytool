import React from 'react';
import './SurveyDowndrop.scss'
const DropdownExample: React.FC = () => {
 
  const menuItems = [
    { id: 1, label: "Untitled" },
    { id: 2, label: "Edit Survey" },
    { id: 3, label: "Preview Survey" },
    { id: 4, label: "Send Survey" },
    { id: 5, label: "Analyze result" }
  ];

  return (
    <div className="dropdown-survey">
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>{item.label}</li> 
        ))}
      </ul>
    </div>
  );
};

export default DropdownExample;
