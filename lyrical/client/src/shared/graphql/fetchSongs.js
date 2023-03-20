import gql from 'graphql-tag';

const query = gql`
	query {
		songs {
			id
			title
		}
	}
`;

export default query;
