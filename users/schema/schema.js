// const _ = require('lodash');
const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// dummy data in DB
/*
const users = [
  { id: '23', firstName: 'Bill', age: 20 }, 
  { id: '47', firstName: 'Samantha', age: 21 }
];
*/

// scheme example
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(res => res.data);
      }
    }
  }
});

// RootQuery: entry point of application
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        // return a actual piece of data from database or data store.
        // return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
