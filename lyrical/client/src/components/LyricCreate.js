import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import ADD_LYRIC from "../queries/addLyric";
import GET_SONG_BY_ID from "../queries/getSongByID";


const LyricCreate = ({ id }) => {
  const [content, setContent] = useState('');
  const [addLyric, { loading, error }] = useMutation(ADD_LYRIC, {
    refetchQueries: [{ GET_SONG_BY_ID }]
  });

  const onSubmit = (e) =>{
    e.preventDefault();
    addLyric({
      variables: {
        content,
        songId: id,
      }
    }).then(() => setContent(''));
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label>Add a Lyric</label>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
    </form>
  )
}

export default LyricCreate;
