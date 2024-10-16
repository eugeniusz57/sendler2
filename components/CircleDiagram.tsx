import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartData {
	data: {
		name: string;
		value: number | undefined;
	}[]
};

const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

const renderCustomizedLabel: React.FC<any> = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
	const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const CircleDiagram: React.FC<ChartData> = ({ data }) => (
	<>
		<div className='hidden xl:block'>
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="40%"
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={140}
						fill="#8884d8"
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
		<div className='hidden lg:block xl:hidden'>
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="40%"
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={120}
						fill="#8884d8"
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
		<div className='block lg:hidden'>
			<ResponsiveContainer width="100%" height={200}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="40%"
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={80}
						fill="#8884d8"
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	</>
);

export default CircleDiagram;
