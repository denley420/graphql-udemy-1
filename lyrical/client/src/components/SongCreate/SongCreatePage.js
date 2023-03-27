import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';

import fetchSongsQuery from '../../shared/graphql/fetchSongs';
import addSongMutation from '../../shared/graphql/addSong';
import deleteSongMutation from '../../shared/graphql/deleteSong';

const SongCreate = props => {
	const [ title, setTitle ] = useState('');

	const history = useNavigate();

	const handleOnChange = event => {
		setTitle(event.target.value);
	};

	const handleOnSubmit = event => {
		event.preventDefault();
		props
			.mutate({
				variables: {
					title: title
				},
				refetchQueries: () => [ { query: fetchSongsQuery } ],
				awaitrefetch: true
			})
			.then(() => {
				history.push('/');
			});
	};

	return (
		<div>
			<Link to='/'>Back</Link>
			<h3>Create a New Song</h3>
			<form onSubmit={handleOnSubmit}>
				<label>Enter the Song Title:</label>
				<input className='input-field' onChange={handleOnChange} value={title} />
			</form>
		</div>
	);
};

export default graphql(addSongMutation)(SongCreate);
