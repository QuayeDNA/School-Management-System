import { FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const SalaryAnalytics = () => {
  const salaryData = [
    { role: 'Teacher', averageSalary: 50000, employeeCount: 20 },
    { role: 'Admin', averageSalary: 45000, employeeCount: 5 },
    { role: 'Janitor', averageSalary: 30000, employeeCount: 3 },
    { role: 'Intern', averageSalary: 25000, employeeCount: 2 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaChartLine className="mr-2" /> Salary Analytics
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Average Salary</th>
              <th className="py-2 px-4 text-left">Employee Count</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((data, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{data.role}</td>
                <td className="py-2 px-4">₵{data.averageSalary.toLocaleString()}</td>
                <td className="py-2 px-4">{data.employeeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-around mb-8">
        <div className="w-full md:w-1/2 h-64">
          <h3 className="text-xl font-semibold mb-4">Average Salary by Role</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData}>
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="averageSalary" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 h-64">
          <h3 className="text-xl font-semibold mb-4">Employee Count Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salaryData}
                dataKey="employeeCount"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {salaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalaryAnalytics;