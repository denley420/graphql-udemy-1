import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useMutation } from '@apollo/client';
import ADD_SONG from "../queries/addSong";
import FETCH_SONGS from "../queries/fetchSongs";

const SongCreate = () => {
  const [title, setTitle] = useState('');
  const [addSong, { loading, error }] = useMutation(ADD_SONG, {
    refetchQueries: [{query: FETCH_SONGS}],});
  const navigate = useNavigate();

  if (loading) return <div>Submitting...</div>
  if (error) return `Submission error! ${error.message}`;

  function onSubmit (e) {
    e.preventDefault();
    addSong({ variables: { title: title } });
    setTitle('');
    navigate('/songs');
  }

  return (
  <div className="container">
    <Link to="/songs">
      Back
    </Link>
    <h3>Create a New song</h3>
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <label>Song title:</label>
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
      </div>
    </form>
  </div>
  )
}

export default SongCreate;
