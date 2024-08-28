
import { FaCalculator } from 'react-icons/fa';

const TaxManagement = () => {
  const taxData = [
    { id: 1, name: 'Federal Income Tax', rate: '22%' },
    { id: 2, name: 'State Income Tax', rate: '5%' },
    { id: 3, name: 'Social Security', rate: '6.2%' },
    { id: 4, name: 'Medicare', rate: '1.45%' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaCalculator className="mr-2" /> Tax Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Tax Name</th>
              <th className="py-2 px-4 text-left">Rate</th>
            </tr>
          </thead>
          <tbody>
            {taxData.map((tax) => (
              <tr key={tax.id} className="border-b">
                <td className="py-2 px-4">{tax.name}</td>
                <td className="py-2 px-4">{tax.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxManagement;