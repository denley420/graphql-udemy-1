import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {ApolloClient, InMemoryCache} from "@apollo/client";

import { ApolloProvider } from 'react-apollo';

import { HttpLink } from 'apollo-link-http';

import Dashboard from './components/Dashboard/DashboardPage';
import SongCreate from './components/SongCreate/SongCreatePage';
import SongDetail from './components/SongDetail/SongDetailPage';

const cache = new InMemoryCache({});

const link = new HttpLink({
	uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
});

function App () {
	return (
		<ApolloProvider client={client}>
			<section className='container'>
				<h1>Lyrical</h1>
				<Router>
					<Routes>
						<Route exact path='/' component={Dashboard} />
						<Route path='/songs/new' component={SongCreate} />
						<Route path='/songs/:id' component={SongDetail} />
					</Routes>
				</Router>
			</section>
		</ApolloProvider>
	);
}

export default App;
