
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <Link to="/">
                        <span>Talks</span>
                    </Link>
                </header>
                <div className="app-content">{this.props.children}</div>
                <footer>
                    <p>
                        Initial talks and lectures app
                    </p>
                </footer>
            </div>
        );
    }
}
