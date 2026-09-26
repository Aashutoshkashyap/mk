import React from "react";

interface PublicErrorBoundaryProps {
  children: React.ReactNode;
}

interface PublicErrorBoundaryState {
  hasError: boolean;
}

class PublicErrorBoundary extends React.Component<
  PublicErrorBoundaryProps,
  PublicErrorBoundaryState
> {
  public state: PublicErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): PublicErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  public componentDidCatch(
    error: Error,
    errorInfo: React.ErrorInfo,
  ) {
    if (import.meta.env.DEV) {
      console.error(
        "Public website rendering error:",
        error,
        errorInfo,
      );
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center px-6 bg-background">
          <div className="max-w-lg text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Something went wrong
            </h1>

            <p className="mt-4 text-muted-foreground">
              We could not load this page correctly.
              Please try refreshing the page.
            </p>

            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Reload page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default PublicErrorBoundary;
