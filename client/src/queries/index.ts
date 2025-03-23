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

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $isAdmin: Boolean!){
    createUser(name: $name, username: $username, email: $email, password: $password isAdmin: $isAdmin) {
      id,
      isAdmin,
      name,
      username,
      password,
      email,
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!){
    deleteUser(id: $id) {
      id,
      isAdmin,
      name,
      username,
      password,
      email,
    }
  }
`
