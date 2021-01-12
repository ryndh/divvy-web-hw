import React, { Fragment, useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import BasicForm from '../BasicForm'
import useMerchantData from '../Merchants/useMerchantData'
import useUserData from '../Users/useUserData'
import Dropdown from '../Dropdown'
import useTransactionData from './useTransactionData'

const transactionFields = [
  { type: 'number', label: 'amount' },
  { type: 'text', label: 'description' }
]

const Transactions = () => {
  const { selectedUser, selectUser, users } = useUserData()
  const { selectedMerchant, selectMerchant, merchants } = useMerchantData()
  const { addTransaction, selectTransaction, deleteTransaction, transactions } = useTransactionData()
  const typeArr = [{ id: 'credit' }, { id: 'debit' }]
  const [type, setType] = useState('credit')
  const selectType = (val) => {
    setType(val)
  }

  return (
    <Fragment>
      <h1>Transactions</h1>
      <Dropdown data={transactions} handler={selectTransaction} name='transactions' propName={['amount', 'person.firstName', 'place.name']} />
      <button onClick={deleteTransaction} type='button'>Delete Transaction</button>
      <BasicForm
        fields={transactionFields}
        hiddenVals={{ merchantId: selectedMerchant, userId: selectedUser, credit: type === 'credit', debit: type === 'debit' }}
        name='Add Transaction'
        onSubmit={addTransaction}
      >
        <Dropdown data={users} handler={selectUser} name='users' propName='firstName' />
        <Dropdown data={merchants} handler={selectMerchant} name='merchants' propName='name' />
        <Dropdown data={typeArr} handler={selectType} name='merchants' propName='id' />
      </BasicForm>
    </Fragment>
  )
}

export default Transactions
