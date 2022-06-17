import { gql } from "@apollo/client/";




export const DELETE_CLIENT = gql`
mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
        id
        name
        email
        phone
    }
}`;

export const ADD_CLIENT = gql`
mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
        id
        name
        email
        phone
        }
        }`;


export const DELETE_PROJECT = gql`
mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
        id
        name
        description
        client {
            id
            name
            email
            phone
        }
    }
}`;



export const ADD_PROJECT = gql`
mutation AddProject(
  $name: String!
  $description: String!

  $clientId: ID!
) {
  addProject(
    name: $name
    description: $description
   
    clientId: $clientId
  ) {
    id
    name
    description
    
    client {
      id
      name
      email
      phone
    }
  }
}
`;

export const UPDATE_PROJECT = gql`
mutation updateProject($id: ID!, $name: String!, $description: String!) {
    updateProject(id: $id, name: $name, description: $description) {
        id
        name
        description
        client {
            id
            name
            email
            phone
        }     
    }
}`;

