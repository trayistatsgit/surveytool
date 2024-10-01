
import React from 'react';
import BreadCrumb from '../breadcrumb/BreadCrumb';
//import { Outlet } from 'react-router-dom';

const SurveyBreadCrumb: React.FC = ()=>{
    const tabs = [
        { label: 'SUMMARY', path: '/summary' },
        { label: 'DESIGN SURVEY', path: '/design-survey' },
        { label: 'COLLECT RESPONSES', path: '/collect-responses' },
        { label: 'ANALYZE RESULTS', path: '/analyze-results' },
        { label: 'PRESENT RESULTS', path: '/present-results' },
      ];

    return (
      <div>
        <BreadCrumb tabs={tabs} />
        
      </div>
    );
  };
export default SurveyBreadCrumb;