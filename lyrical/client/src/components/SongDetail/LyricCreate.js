import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import addLyricToSong from '../../shared/graphql/addlLyricToSong';

const LyricCreate = props => {
	const [ _lyric, _setLyric ] = useState({ content: '' });

	const handleOnChange = event => {
		_setLyric({ content: event.target.value });
	};

	const handleOnSubmit = event => {
		event.preventDefault();
		props
			.mutate({
				variables: {
					content: _lyric.content,
					songId: props.songId
				}
			})
			.then(result => {
				console.log(result);
				_setLyric({ content: '' });
			});
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<label>Add a Lyric</label>
			<input value={_lyric.content} onChange={handleOnChange} />
		</form>
	);
};

export default graphql(addLyricToSong)(LyricCreate);
