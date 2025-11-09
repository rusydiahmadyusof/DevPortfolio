import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches React component errors and displays a fallback UI
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    
    // In production, you could log to an error reporting service
    // Example: Sentry, LogRocket, etc.
    // if (import.meta.env.PROD) {
    //   errorReportingService.captureException(error, {
    //     contexts: { react: errorInfo },
    //   });
    // }
    
    // Optional: Send to analytics or monitoring service
    // Uncomment and configure when ready to integrate error tracking
    // if (import.meta.env.PROD && 'navigator' in window && 'sendBeacon' in navigator) {
    //   try {
    //     const errorData = {
    //       message: error.message,
    //       stack: error.stack,
    //       componentStack: errorInfo.componentStack,
    //       timestamp: new Date().toISOString(),
    //     };
    //     // You can send to your error tracking endpoint here
    //     // navigator.sendBeacon('/api/errors', JSON.stringify(errorData));
    //   } catch (e) {
    //     // Silently fail if error reporting fails
    //   }
    // }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-text p-4">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-accent-pink mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-text-muted mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

