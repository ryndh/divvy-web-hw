import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers {
    users {
      id,
      firstName,
      lastName,
      dob
    }
  }
`

export const ADD_USER = gql`
mutation AddUser($dob:String!, $firstName:String!, $lastName: String!) {
  createUser(dob: $dob, firstName:$firstName, lastName:$lastName){
    dob,
    firstName,
    lastName
  }
}
`

export const DELETE_USER = gql`
mutation DeleteUser($id: ID!){
  deleteUser(id: $id) {
    id
  }
}
`
export const GET_MERCHANTS = gql`
  query GetMerchants {
    merchants {
      id,
      name,
      description
    }
  }
`

export const ADD_MERCHANT = gql`
mutation AddMerchant($name:String!, $description:String!) {
  createMerchant(name: $name, description:$description){
    name,
    description
  }
}
`

export const DELETE_MERCHANT = gql`
mutation DeleteMerchant($id: ID!){
  deleteMerchant(id: $id) {
    id
  }
}
`

export const GET_TRANSACTIONS = gql`
query GetTransactions {
  transactions {
    id,
    amount,
    description,
    user {
      id,
      firstName,
      lastName
    }
    merchant {
      id,
      name,
    },
    credit,
    debit,
  }
}
`

export const ADD_TRANSACTION = gql`
mutation AddTransaction($amount:Int!, $credit:Boolean!, $debit:Boolean!, $description: String!, $merchantId:ID!, $userId: ID!){
  createTransaction(amount:$amount, credit: $credit, debit:$debit, description:$description, merchantId:$merchantId, userId:$userId){
    amount,
    credit,
    debit,
    description,
    merchantId,
    userId
  }
}
`
export const EDIT_TRANSACTION = gql`
mutation EditTransaction($id: ID!, $amount:Int!, $credit:Boolean!, $debit:Boolean!, $description: String!, $merchantId:ID!, $userId: ID!){
  updateTransaction(id: $id, amount:$amount, credit: $credit, debit:$debit, description:$description, merchantId:$merchantId, userId:$userId){
    id,
    amount,
    credit,
    debit,
    description,
    merchantId,
    userId
  }
}
`

export const DELETE_TRANSACTION = gql`
mutation DeleteTransaction($id: ID!){
  deleteTransaction(id: $id) {
    id
  }
}
`
