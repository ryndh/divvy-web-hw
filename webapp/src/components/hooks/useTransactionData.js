import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_TRANSACTION, DELETE_TRANSACTION, GET_TRANSACTIONS, EDIT_TRANSACTION } from '../../services/queries'

const useTransactionData = () => {
  const [selectedTransaction, setSelectedTransaction] = useState()
  const { data: transactionData, loadingTransaction, queryError, refetch } = useQuery(GET_TRANSACTIONS)
  const [addTransaction, { data: mutationData }] = useMutation(ADD_TRANSACTION)
  const [editTransaction, { data: mutationDataEdit }] = useMutation(EDIT_TRANSACTION)
  const [deleteTransaction, { data: deleteTransactionData }] = useMutation(DELETE_TRANSACTION)

  const selectTransaction = (val) => {
    setSelectedTransaction(val)
  }
  useEffect(() => {
    refetch()
  }, [mutationData, deleteTransactionData, mutationDataEdit, refetch])
  useEffect(() => {
    if (transactionData) {
      setSelectedTransaction(transactionData.transactions[0])
    }
  }, [transactionData])

  const transactionsByMerchant = transactionData?.transactions.reduce((obj, next) => {
    const { name } = next.merchant
    obj[name] = (obj[name] || 0) + 1
    return obj
  }, {})

  return { addTransaction, deleteTransaction, editTransaction, loadingTransaction, queryError, selectTransaction, selectedTransaction, transactions: transactionData?.transactions, transactionsByMerchant }
}

export default useTransactionData
