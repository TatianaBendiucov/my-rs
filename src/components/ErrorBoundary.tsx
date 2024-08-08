"use client";
import { Component, ErrorInfo } from "react";
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "../types/ErrorBoundaryTypes";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.fallback}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
