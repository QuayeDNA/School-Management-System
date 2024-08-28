import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="flex items-center text-red-600 text-xl font-semibold">
                <FaExclamationTriangle className="mr-2" />
                Oops! Something went wrong
              </h2>
            </div>
            <div className="p-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error Details</strong>
                <span className="block sm:inline">
                  <p className="mt-2">{this.state.error?.toString()}</p>
                  <details className="mt-4 text-sm">
                    <summary>Stack Trace</summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                </span>
              </div>
              <div className="mt-6">
                <p className="text-gray-600">
                  We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;