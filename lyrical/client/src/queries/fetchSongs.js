import {gql} from "@apollo/client";

const FETCH_SONGS = gql`
{
  songs {
    id
    title
  }
}
`;

export default FETCH_SONGS;