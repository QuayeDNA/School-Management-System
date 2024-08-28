import PropTypes from 'prop-types';

const ViewPaymentHistory = ({ employee = {}, paymentHistory = [], onClose }) => {
  return (

      <div className="bg-white p-5 rounded-lg shadow-xl w-full">
        <h2 className="text-2xl font-bold mb-4">
          Payment History for {employee.name ? employee.name : 'Unknown'}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Amount</th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.length > 0 ? (
                paymentHistory.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{payment.date}</td>
                    <td className="py-2 px-4 border-b">${payment.amount.toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{payment.type}</td>
                    <td className="py-2 px-4 border-b">{payment.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border-b" colSpan="4">No payment history available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>

  );
};

ViewPaymentHistory.propTypes = {
  employee: PropTypes.object.isRequired,
  paymentHistory: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewPaymentHistory;