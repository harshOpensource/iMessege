import { gql } from "@apollo/client";

export default {
  Queries: {
    searchUsers: gql`
      query searchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
        }
      }
    `,
  },

  Mutation: {
    createUsername: gql`
      mutation createUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
};
