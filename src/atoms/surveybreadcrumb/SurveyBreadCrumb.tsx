import React from 'react';
import BreadCrumb from '../breadcrumb/BreadCrumb';
interface ISurveyBreadCrumb {
	surveyId: string;
}
const SurveyBreadCrumb: React.FC<ISurveyBreadCrumb> = ({ surveyId }) => {
	const tabs = [
		{ label: 'SUMMARY', path: '/summary' },
		{ label: 'DESIGN SURVEY', path: `/create-survey/29f9d348-3f91-4188-a61d-86b3b58e98c0` },
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
