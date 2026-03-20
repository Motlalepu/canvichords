import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details to console for debugging
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-destructive/10 p-4 rounded-full">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Something Went Wrong
            </h1>

            {/* Error Message */}
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Please try refreshing the page
              or contact support if the issue persists.
            </p>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 p-4 bg-muted rounded text-left text-sm">
                <p className="font-mono text-xs text-destructive font-bold mb-2">
                  Error Details:
                </p>
                <p className="font-mono text-xs text-foreground/80 break-words">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs font-bold text-foreground/60">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 text-xs text-foreground/60 overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button size="lg" onClick={this.handleReset} className="w-full">
                Try Again
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="w-full"
              >
                Go Home
              </Button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-muted-foreground mt-6">
              If this problem continues, please{" "}
              <a
                href="/contact"
                className="text-primary underline hover:no-underline"
              >
                contact our support team
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
