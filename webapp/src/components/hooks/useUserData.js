import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, ADD_USER, DELETE_USER } from '../../services/queries'

const useUserData = () => {
  const [selectedUser, setSelectedUser] = useState()
  const { data: userData, error: queryError, loading: loadingUsers, refetch } = useQuery(GET_USERS)
  const [addUser, { data: mutationData }] = useMutation(ADD_USER)
  const [deleteUser, { data: deleteUserData }] = useMutation(DELETE_USER)

  const selectUser = (val) => {
    setSelectedUser(val)
  }
  useEffect(() => {
    refetch()
  }, [mutationData, deleteUserData, refetch])
  useEffect(() => {
    if (userData) {
      setSelectedUser(userData?.users[0])
    }
  }, [userData])

  return { addUser, deleteUser, loadingUsers, queryError, selectUser, selectedUser, users: userData?.users }
}

export default useUserData
