import React, { Fragment } from 'react'
import BasicForm from '../BasicForm'
import Dropdown from '../Dropdown'
import useUserData from './useUserData'

const userFields = [
  { type: 'text', label: 'dob' },
  { type: 'text', label: 'firstName' },
  { type: 'text', label: 'lastName' }
]

const Users = () => {
  const { selectedUser, addUser, deleteUser, selectUser, loadingUsers, queryError, users } = useUserData()

  const handleSubmit = () => {
    deleteUser({ variables: { id: selectedUser } })
  }

  return (
    <Fragment>
      <h1>Users</h1>
      {loadingUsers && 'Loading!'}
      {queryError && 'Error!'}
      <Dropdown data={users} handler={selectUser} name='users' propName='firstName' />

      <button onClick={handleSubmit} type='button'>Delete User</button>
      <BasicForm fields={userFields} name='Add User' onSubmit={addUser} />
    </Fragment>
  )
}

export default Users
