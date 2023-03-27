import {gql} from "@apollo/client";

const GET_SONG_BY_ID = gql`
query getSongByID($id: ID!) {
  song(id: $id) {
    id
    title
    lyrics {
      id
      content
    }
  }
}
`;

export default GET_SONG_BY_ID;
