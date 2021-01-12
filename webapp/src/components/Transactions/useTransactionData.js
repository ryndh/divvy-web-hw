import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_TRANSACTION, DELETE_TRANSACTION, GET_TRANSACTIONS } from '../../services/queries'

const useTransactionData = () => {
  const [selectedTransaction, setSelectedTransaction] = useState()
  const { loadingTransaction, queryError, data: transactionData, refetch } = useQuery(GET_TRANSACTIONS)
  const [addTransaction, { data: mutationData }] = useMutation(ADD_TRANSACTION)
  const [deleteTransaction, { data: deleteTransactionData }] = useMutation(DELETE_TRANSACTION)

  const selectTransaction = (val) => {
    setSelectedTransaction(val)
  }
  useEffect(() => {
    refetch()
  }, [mutationData, deleteTransactionData])
  useEffect(() => {
    if (transactionData) {
      setSelectedTransaction(transactionData.transactions[0].id)
    }
  }, [transactionData])

  return { selectedTransaction, selectTransaction, deleteTransaction, addTransaction, transactions: transactionData?.transactions, loadingTransaction, queryError }
}

export default useTransactionData
