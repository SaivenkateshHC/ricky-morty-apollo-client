import React from 'react';
import './index.scss';
import {hydrateRoot} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import CombinedRoutes from "./core/CombinedRoutes";

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'

//apollo
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {api} from "./core/constants";

const client = new ApolloClient({
	uri: api,
	cache: new InMemoryCache()
});


const routing = (

	<Router>
		<ApolloProvider client={client}>
			<CombinedRoutes/>
		</ApolloProvider>
	</Router>

);

const container = document.getElementById('root');
hydrateRoot(container, routing);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
