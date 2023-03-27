import React from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {Link, useNavigate} from 'react-router-dom';
import FETCH_SONGS from "../queries/fetchSongs";
import DELETE_SONG from "../queries/deleteSong";

const SongList = () => {
  const { loading, error, data } = useQuery(FETCH_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{query: FETCH_SONGS}],});
  const navigate = useNavigate();

  const onSongDelete = (id) => {
    deleteSong({variables: {id: id}}).then(r => r.data);
     navigate('/songs');
  }

  const renderSongs = !loading && data.songs.map(({ id, title }) => {
    return (
      <li key={id} className="collection-item">
        <Link to={id}>
        {title}
        </Link>
        <i className={"material-icons"}
           onClick={() => onSongDelete(id)}>delete</i>
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