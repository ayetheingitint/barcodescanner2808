import React from 'react';
import { f7, f7ready, Page, App, View, Navbar, Toolbar, Link, Block } from 'framework7-react';

import Homecomponent from '../pages/home.jsx';
import Barcodescannercomponent from '../pages/test3.jsx';
import Camerasizereduce from '../pages/camerasizereduce.jsx';
const routes = [
    {
        path: '/',
        component: Homecomponent,
    },
       {
        path: '/barcode-reader/',
        component: Barcodescannercomponent,
    },
    {
        path: '/camerasizereduce/',
        component: Camerasizereduce,
    },
];

const MyApp = () => {

    return (
        <App>
            <View main url="/" routes={routes}></View>
        </App>
    );
};

export default MyApp;