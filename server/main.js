import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

const mockUsers = [
  { id: "1", isAdmin: true, name: "John Doe", username: "johndoe", password: "password1", email: "john@gmail.com" },
  { id: "2", isAdmin: false, name: "Clark Doe", username: "clarkdoe", password: "password", email: "clark@gmail.com" },
  { id: "3", isAdmin: false, name: "Sara Doe", username: "saradoe", password: "password", email: "sara@gmail.com" },
];

// ? ID! means that the Id field is required, not using "!" would make it optional
const typeDefs = `
  type Query {
    getUsers: [User],
    getUserById(id: ID!): User, 
  }
  
  type Mutation {
    createUser(isAdmin: Boolean, name: String!, username: String!, password: String!, email: String!): User
    updateUser(id: ID!, isAdmin: Boolean, name: String, username: String, password: String, email: String): User
    deleteUser(id: ID!): User
  }

  type User {
    id: ID!,
    isAdmin: Boolean,
    name: String,
    username: String,
    password: String,
    email: String,
  }
`;

const resolvers = {
  Query: {
    getUsers: () => {
      //? on a real world scenario this would be a database query
      return mockUsers;
    },
    //? parent here, represents the "Query" object, which is the parent Object of the function
    //? it allows us to access the parent object properties
    getUserById: (_parent, args) => {
      const id = args.id;
      return mockUsers.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (_parent, args) => {
      const { name, username, password, email, isAdmin } = args;
      const newUser = {
        id: mockUsers.length + 1,
        name,
        username,
        password,
        email,
        isAdmin,
      };
      mockUsers.push(newUser);
      return newUser;
    },
    updateUser: (_parent, args) => {
      const { id, name, username, password, email, isAdmin } = args;
      const userIndex = mockUsers.findIndex((user) => user.id === id);
      if (userIndex === -1) return null;
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        name,
        username,
        password,
        email,
        isAdmin,
      };
      return mockUsers[userIndex];
    },
    deleteUser: (_parent, args) => {
      const id = args.id;
      const userIndex = mockUsers.findIndex((user) => user.id === id);
      if (userIndex === -1) return null;
      const deletedUser = mockUsers[userIndex];
      mockUsers.splice(userIndex, 1);
      return deletedUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
});

console.log(`🚀 Server ready at ${url}`);
