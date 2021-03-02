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

setGlobal({
	devicesList: [],
});


// AXIOS

axios.defaults.baseURL = 'http://localhost:8000';
//axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

