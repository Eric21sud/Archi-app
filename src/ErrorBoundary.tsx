import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-[#020409] text-red-400 min-h-screen flex flex-col items-center justify-center font-mono">
          <h2 className="text-xl font-bold mb-4">🚨 Une erreur est survenue à l'affichage</h2>
          <div className="bg-black/50 p-4 rounded-lg border border-red-500/30 w-full max-w-lg overflow-auto text-xs">
            <p className="font-semibold text-red-300">{this.state.error?.toString()}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-sans font-medium transition-colors"
          >
            Recharger l'application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
