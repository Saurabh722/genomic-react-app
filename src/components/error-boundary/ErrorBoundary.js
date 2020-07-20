import React, { Component } from "react";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { isError: true };
    }

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
    }

    render() {
        if (this.state.isError) {
            return <li className="list-item"><span>Looks like some thing went wrong :(</span></li>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;