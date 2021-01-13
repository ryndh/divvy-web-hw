import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, ADD_USER, DELETE_USER } from '../../services/queries'

const useUserData = () => {
  const [selectedUser, setSelectedUser] = useState()
  const { loading: loadingUsers, error: queryError, data: userData, refetch } = useQuery(GET_USERS)
  const [addUser, { data: mutationData }] = useMutation(ADD_USER)
  const [deleteUser, { data: deleteUserData }] = useMutation(DELETE_USER)

  const selectUser = (val) => {
    setSelectedUser(val)
  }
  useEffect(() => {
    refetch()
  }, [mutationData, deleteUserData])
  useEffect(() => {
    if (userData) {
      setSelectedUser(userData?.users[0])
    }
  }, [userData])

  return { selectedUser, selectUser, deleteUser, addUser, users: userData?.users, loadingUsers, queryError }
}

export default useUserData
