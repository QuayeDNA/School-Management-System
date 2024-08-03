// Desc: DataVisualization component for student management
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import PropTypes from 'prop-types';

const DataVisualization = ({ students }) => {
  const genderData = [
    { name: 'Male', value: students.filter(s => s.gender === 'Male').length },
    { name: 'Female', value: students.filter(s => s.gender === 'Female').length },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={genderData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

DataVisualization.propTypes = {
  students: PropTypes.array.isRequired
};

export default DataVisualization;