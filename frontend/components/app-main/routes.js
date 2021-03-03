/**************************************************************************************************
APP-MAIN ROUTES
**************************************************************************************************/
import * as PR from '../page-routes/_index.js'

export const RoutesConfig = [
    {
        title: 'Base Websocket',
        path: '/base-websocket',
        component: PR.BaseWebsocket,
        order: 1,
    },
    {
        title: 'Base Axios',
        path: '/base-axios',
        component: PR.BaseAxios,
        order: 2,
    },
    {
        title: 'Default',
        path: '',
        component: PR.BaseWebsocket,
        order: 0,
    },    
];
