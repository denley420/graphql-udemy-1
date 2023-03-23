import {gql} from "@apollo/client";

const ADD_SONG = gql`
mutation AddSong($title: String) {
  addSong(title: $title){
    id
    title
  }
}
`;

export default ADD_SONG;