const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, _args) {
        return axios.get(`http://localhost:8080/companies/${parentValue.id}/users`)
          .then( res => res.data)
      }
    },
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: function (parentValue, _args) {
        return axios.get(`http://localhost:8080/companies/${parentValue.companyId}`)
          .then( res => res.data)
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve( parentValue, args) {
        return axios.get(`http://localhost:8080/users/${args.id}`)
          .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentalValue, args) {
        return axios.get(`http://localhost:8080/companies/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve( parentValue, { firstName, age }) {
        return axios.post(`http://localhost:8080/users/`, {
          firstName,
          age
        })
          .then(res => res.data);
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve( parentValue, { firstName, age, companyId, id }) {
        return axios.patch(`http://localhost:8080/users/${id}`, {
          firstName,
          age,
          companyId,
        })
          .then(res => res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve( parentValue, { id }) {
        return axios.delete(`http://localhost:8080/users/${id}`)
          .then(res => res.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});