import React, { Fragment } from 'react'
import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query {
    users {
      firstName
    }
  }
`;

export default function Home () {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <Fragment>
      <div>Ready, steady, go!</div>
      {loading && 'Loading!'}
      {error && 'Error!'}
      {data?.users.map(user => {
        return (
          <div>
            {user.firstName}
          </div>
        )
      })}
    </Fragment>
  )
}
