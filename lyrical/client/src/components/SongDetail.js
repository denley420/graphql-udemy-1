import React from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";

import GET_SONG_BY_ID from "../queries/getSongByID";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

const SongDetail = (props) => {
  const params = useParams();

  const { loading, data } = useQuery(GET_SONG_BY_ID, {
    variables: { id: params.id }
  });
  return (
    <div className="container">
      <Link to="/songs">
        Back
      </Link>
      <h3>{loading ? 'Song details' : data?.song.title }</h3>
      <LyricList lyrics={!loading ? data?.song?.lyrics : [] } />
      <LyricCreate id={params.id} />
    </div>
  )
}

export default SongDetail;