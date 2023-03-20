import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import fetchSongDetailQuery from '../../shared/graphql/fetchSongDetail';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

const SongDetail = props => {
	const _song = props.data.song;

	if (!_song) {
		return <div>Loading ....</div>;
	}

	return (
		<div>
			<Link to='/'>Back</Link>
			<h3>{_song.title}</h3>
			<LyricList lyrics={_song.lyrics} />
			<LyricCreate songId={_song.id} />
		</div>
	);
};

export default graphql(fetchSongDetailQuery, {
	options: props => {
		return {
			variables: {
				id: props.match.params.id
			}
		};
	}
})(SongDetail);
