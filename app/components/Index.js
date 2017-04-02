
import React from 'react';
import talks from '../../test/responses/staticData';
import TalksPreview from './TalksPreview';



export default class IndexPage extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="talks-selector">
                {talks.map(talk => <TalksPreview key={talk.id} {...talk}/>)}
                </div>
            </div>
        );
    }
}