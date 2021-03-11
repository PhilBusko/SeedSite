/**************************************************************************************************
INDEX - WEBAPP ENTRY POINT
**************************************************************************************************/
import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import * as serviceWorker from './service-worker';
import App from './app-root';


// VIRTUAL DOM

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, 
	document.getElementById('root')
);
serviceWorker.unregister();


// GLOBAL STATE
// this doesn't work

setGlobal({
	envHost: 'hostll',
});

