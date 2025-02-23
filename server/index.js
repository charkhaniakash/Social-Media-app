const { ApolloServer } = require("apollo-server");
// const { gql } = require("graphql-tag");
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");

// const Post = require("./models/Post");
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');
const redis = require("./redis-client.js");

// const typeDefs = gql`
//  type Post {
//     id:ID!
//     body:String!
//     createdAt:String!
//     username:String!
//  }

//   type Query {
//     getPosts: [Post]
//   }
// `;


// const resolvers = {
//   Query: {
//     async getPosts(){
//         try {
//             const posts = await Post.find()
//             return posts;
//         } catch (error) {
//             throw new Error(error)
//         }
//     }
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers,context:({req})=>({req}) });




const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }) => ({ req, redis })  // Pass Redis client to context
});

const POST = process.env.PORT || 5000; 

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected");
    return server.listen({ port:POST });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });

// server.listen({ port: 5000 }).then((res) => {
//   console.log(`Akash i running ${res.url}`);
// });
