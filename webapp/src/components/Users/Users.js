import React, { Fragment } from 'react'
import BasicForm from '../BasicForm'
import useUserData from './useUserData'
import { Modal, useModal } from '../Modal'
import { css } from '@emotion/core'
import { colors } from '../../colors'

export const interactiveListCss = css`
  cursor: pointer;
  :hover {
    background: ${colors.list.hover};
  }
`
const userFields = [
  { type: 'date', label: 'dob' },
  { type: 'text', label: 'firstName' },
  { type: 'text', label: 'lastName' }
]

const Users = () => {
  const { selectedUser, addUser, deleteUser, selectUser, loadingUsers, queryError, users } = useUserData()
  const modalData = useModal()
  const handleSubmit = () => {
    deleteUser({ variables: { id: selectedUser.id } })
  }
  const selectAndCloseModal = (user) => {
    selectUser(user)
    modalData.toggleOpen(false)
  }

  return (
    <Fragment>
      <h1>Users</h1>
      {loadingUsers && 'Loading!'}
      {queryError && 'Error!'}
      <div>
        {selectedUser && `Selected User: ${selectedUser.firstName} ${selectedUser.lastName}`}
      </div>

      <button onClick={handleSubmit} type='button'>Delete User</button>
      <Modal.Button {...modalData} title="Select User" />

      <BasicForm fields={userFields} name='Add User' onSubmit={addUser} />

      <Modal.Content {...modalData} title='Select User'>
        <ul>
          {users?.map((user, idx) => {
            const key = `${user.firstName}${idx}`
            return (
              <li css={interactiveListCss} key={key} onClick={() => selectAndCloseModal(user)}>
                {`${user.firstName} ${user.lastName} - DOB: ${user.dob}`}
              </li>
            )
          })}
        </ul>
      </Modal.Content>
    </Fragment>
  )
}

export default Users
