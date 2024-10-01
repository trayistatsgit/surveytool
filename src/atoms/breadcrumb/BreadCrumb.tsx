import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './BreadCrumb.scss';

interface Tab {
  label: string;
  path: string;
}

interface BreadCrumbProps {
  tabs: Tab[]; 
}
 const BreadCrumb: React.FC <BreadCrumbProps> = ({tabs}) =>{
   
  const [activeTab, setActiveTab] = useState<string>(); 
  const navigate = useNavigate();

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.label);
    navigate(tab.path); 
  };
   
 
  return (
    <div className="breadcrumb-container">
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.label}>
          <div
            className={`breadcrumb-tab-item ${
              activeTab === tab.label ? 'breadcrumb-active' : ''
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </div>
          {index < tabs.length - 1 && <span className="breadcrumb-arrow">➔</span>}
        </React.Fragment>
      ))}
    </div>

    
  )
}

export default BreadCrumb;