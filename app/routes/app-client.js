import React from 'react';
import ReactDom from 'react-dom';
import AppRoutes from '../components/AppRoutes';

window.onload = () => {
    ReactDom.render(<AppRoutes/>, document.getElementById('main'));
};