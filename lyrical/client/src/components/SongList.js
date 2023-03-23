import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import FETCH_SONGS from "../queries/fetchSongs";

const SongList = () => {
  const { loading, error, data } = useQuery(FETCH_SONGS);
  const renderSongs = !loading && data.songs.map(song => {
    return (
      <li key={song.id} className="collection-item">
        {song.title}
      </li>
    )
  })

  return(
    <div className="container">
      {loading && 'Loading...'}
      {error && 'Error...'}
      {data && <ul className="collection">{renderSongs}</ul>}
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  )
}

export default SongList;