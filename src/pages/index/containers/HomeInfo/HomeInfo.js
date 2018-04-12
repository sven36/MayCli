import React from 'react';
import './HomeInfo.scss';

class HomeInfo extends React.Component {
    componentWillMount() {
        console.log('HomeInfo render componentWillMount');
    }
    componentDidMount() {
        console.log('HomeInfo render componentDidMount');
    }

    render() {
        return <div className="ts">I am HomeInfo</div>
    }
}

export default HomeInfo