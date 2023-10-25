import { gql } from "graphql-tag";

const userTypeDefs = gql`
  type User {
    id: String
    username: String
  }
  type Query {
    searchUsers(username: String!): [User]
  }
`;

export default userTypeDefs;
