import {gql} from "@apollo/client";

const ADD_LYRIC = gql`
mutation AddLyric($songId: ID!, $content: String) {
  addLyricToSong(songId: $songId, content: $content){
    id
    lyrics {
      content
    }
  }
}
`;

export default ADD_LYRIC;