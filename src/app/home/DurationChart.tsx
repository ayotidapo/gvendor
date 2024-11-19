import BarChart from '@/atoms/charts/BarChart';
import { useGetDashboardMetricsCountQuery } from '@/redux/dashboard/dashboard.slice';
import { format } from 'date-fns';

const DurationChart = ({ duration = 'day' }: { duration: string }) => {
	const { data: metricsData } = useGetDashboardMetricsCountQuery({
		status: 'COMPLETED',
		duration: duration,
	});

	const labels =
		metricsData?.data?.result.map(item =>
			format(new Date(item.dateTime), 'do MMM HH:mm')
		) || [];
	const values1 = metricsData?.data?.result.map(item => item.total) || [];

	return (
		<BarChart
			height={200}
			xGridDisplay={false}
			yGridDisplay={false}
			responsive
			labels={labels ?? []}
			data={values1 ?? []}
			barThickness={24}
		/>
	);
};

export default DurationChart;
