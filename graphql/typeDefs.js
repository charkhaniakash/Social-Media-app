const { gql } = require("apollo-server");

// Mutations are used to modify data in a database. They are analogous to the ADD, UPDATE and DELETE commands in SQL
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId:ID!):Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
  }
`;

module.exports = typeDefs;
