import React, { Component } from "react";

class ErrorBoundary extends Component {
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
      errorInfo: errorInfo,
    });
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f9ff] p-8">
          <h2 className="mb-6 text-2xl font-semibold text-[#365486]">
            Ups! Sesuatu tidak beres.
          </h2>
          <p className="mb-6 max-w-4xl text-center text-gray-700">
            Kami mohon maaf, terjadi kesalahan tak terduga di sistem kami.
          </p>

          <p className="mb-6 text-sm text-gray-500">
            &copy; 2025 Kelompok 9. Semua hak cipta dilindungi.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[#365486] px-6 py-2 text-white hover:bg-[#2a4675] focus:outline-none focus:ring-2 focus:ring-[#2a4675]"
          >
            Coba Lagi
          </button>

          {this.state.error && (
            <div className="mt-6 w-full max-w-2xl rounded-lg border border-[#365486] bg-[#e0f7fa] p-4 text-left">
              <h4 className="text-lg font-medium text-[#365486]">
                Detail Error:
              </h4>
              <p className="mt-2 text-[#2a4675]">
                <strong>{this.state.error.toString()}</strong>
              </p>
              <pre className="mt-2 overflow-x-scroll text-sm text-gray-700">
                {this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
