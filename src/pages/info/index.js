import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Router, browserHistory,
    Redirect
} from 'react-router';
import Test from './containers/Test/Test'


const rootElement = document.getElementById('root');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/s' component={Test}></Route>
    </Router>,
    rootElement

)