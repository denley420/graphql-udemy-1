import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';

import fetchSongsQuery from '../../shared/graphql/fetchSongs';
import addSongMutation from '../../shared/graphql/addSong';

const SongCreate = props => {
	const [ _title, _setTitle ] = useState('');

	const history = useNavigate();

	const handleOnChange = event => {
		_setTitle(event.target.value);
	};

	const handleOnSubmit = event => {
		event.preventDefault();
		props
			.mutate({
				variables: {
					title: _title
				},
				refetchQueries: () => [ { query: fetchSongsQuery } ],
				awaitrefetch: true
			})
			.then(() => {
				history.push('/');
			});
	};
	console.log('I am here')
	return (
		<div>
			<Link to='/'>Back</Link>
			<h3>Create a New Song</h3>
			<form onSubmit={handleOnSubmit}>
				<label>Enter the Song Title:</label>
				<input className='input-field' onChange={handleOnChange} value={_title} />
			</form>
		</div>
	);
};

export default graphql(addSongMutation)(SongCreate);
