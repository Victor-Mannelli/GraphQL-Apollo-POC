import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query {
    getUsers {
      id,
      name,
      email,
      isAdmin,
    }
  }
`
export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!){
    getUserById(id: $id) {
      id,
      name,
      email,
      isAdmin,
    }
  }
`