import React from 'react';
//import AnalyticsPage from '@/components/Analytics';
import dynamic from 'next/dynamic';
const AnalyticsPage = dynamic(() => import('@/components/Analytics'), {
	ssr: false,
});
const Analytics = () => {
	return (
		<div>
			<AnalyticsPage />
		</div>
	);
};

export default Analytics;
