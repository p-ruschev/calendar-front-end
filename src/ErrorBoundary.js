import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError");
    return { error };
  }

  componentDidCatch(error) {
    console.log("componentDidCatch");
  }

  render() {
    return this.state.error 
      ? <h1 className="error-page">404 - Възникна грешка</h1> 
      : this.props.children;
  }
}
