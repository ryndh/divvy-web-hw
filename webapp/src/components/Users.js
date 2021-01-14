import React from 'react'
import { useTranslation } from 'react-i18next'
import BasicForm from './BasicForm'
import { useUserData } from './hooks'
import { Modal, useModal } from './Modal'
import { css } from '@emotion/core'
import { colors } from '../colors'
import SelectedItem from './SelectedItem'

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
  const { t } = useTranslation()

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
    <div>
      {/* <h1>{t('users-link')}</h1> */}
      {loadingUsers && t('loading')}
      {queryError && t('error')}
      <SelectedItem
        loading={!selectedUser}
        title="Selected User"
        obj={{
          First_Name: selectedUser?.firstName,
          Last_Name: selectedUser?.lastName,
          Date_of_Birth: selectedUser?.dob,
        }}
      />
      <button onClick={handleSubmit} type='button'>{t('delete-user')}</button>
      <Modal.Button {...modalData} title={t('select-user')} />

      <BasicForm fields={userFields} name={t('add-user')} onSubmit={addUser} />

      <Modal.Content {...modalData} title={t('select-user')}>
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
    </div>
  )
}

export default Users
