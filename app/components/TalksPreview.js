
import React from 'react';
import { Link } from 'react-router';

export default class TalksPreview extends React.Component {
    render() {
        return (
            <Link to={`/talk/${this.props.id}`}>
            <div className="talk-preview">
                <h2 className="title">{this.props.title}</h2>
            </div>
            </Link>
        );
    }
}

