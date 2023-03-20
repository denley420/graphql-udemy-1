import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import fetchSongsQuery from '../../shared/graphql/fetchSongs';
import deleteSongMutation from '../../shared/graphql/deleteSong';

const SongList = props => {
	const _songs = props.data.songs;

	if (!_songs) {
		return <div>Loading ....</div>;
	}

	const onDeleteSong = id => {
		props.mutate({ variables: { id } }).then(() => props.data.refetch());
	};

	return (
		<div>
			<ul className='collection highlight-list'>
				{_songs.map(song => {
					return (
						<li key={song.id} className='collection-item'>
							<Link to={`/songs/${song.id}`}>{song.title}</Link>
							<i className='material-icons right' onClick={() => onDeleteSong(song.id)}>
								delete_forever
							</i>
						</li>
					);
				})}
			</ul>
			<Link to='/songs/new' className='btn-floating btn-large red right'>
				<i className='material-icons' style={{ fontSize: 40 }}>
					add
				</i>
			</Link>
		</div>
	);
};

export default graphql(deleteSongMutation)(graphql(fetchSongsQuery)(SongList));
