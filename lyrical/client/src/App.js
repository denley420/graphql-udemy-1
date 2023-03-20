import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import Dashboard from './components/Dashboard/DashboardPage';
import SongCreate from './components/SongCreate/SongCreatePage';
import SongDetail from './components/SongDetail/SongDetailPage';

const cache = new InMemoryCache({});

const link = new HttpLink({
	uri: 'http://172.25.205.83:4000/graphql'
});

const client = new ApolloClient({
	cache,
	link
});

function App () {
	return (
		<ApolloProvider client={client}>
			<Router>
				<section className='container'>
					<Switch>
						<Route exact path='/' component={Dashboard} />
						<Route path='/songs/new' component={SongCreate} />
						<Route path='/songs/:id' component={SongDetail} />
					</Switch>
				</section>
			</Router>
		</ApolloProvider>
	);
}

export default App;
