import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BreadCrumb.scss';

interface Tab {
  label: string;
  path: string;
}

interface BreadCrumbProps {
  tabs: Tab[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ tabs }) => {
  const location = useLocation();
  const pagePath = location.pathname;
  const [activeTab, setActiveTab] = useState<string>('');
  const navigate = useNavigate();

  // Update active tab based on location pathname
  useEffect(() => {
    const matchedTab = tabs.find((tab) => {
      const pathWithoutParams = tab.path.replace(/:\w+/g, '[^/]+');
      const regex = new RegExp(`^${pathWithoutParams}$`);
      return regex.test(pagePath);
    });

    if (matchedTab) {
      setActiveTab(matchedTab.label);
    }
  }, [pagePath, tabs]);

  useEffect(() => {
    // If there's a default tab (like the second tab), navigate to its path initially
    if (tabs[1] && !activeTab) {
      navigate(tabs[1].path);
    }
  }, [tabs, navigate, activeTab]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.label);
    navigate(tab.path);
  };

  return (
    <div className='breadcrumb-container'>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.label}>
          <div className={`breadcrumb-tab-item ${activeTab === tab.label ? 'breadcrumb-active' : ''}`} onClick={() => handleTabClick(tab)}>
            {tab.label}
          </div>
          {index < tabs.length - 1 && <span className='breadcrumb-arrow'>➔</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;
