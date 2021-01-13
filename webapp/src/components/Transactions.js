import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PieChart } from 'react-minimal-pie-chart'
import BasicForm from './BasicForm'
import { useMerchantData, useUserData } from './hooks'
import Dropdown from './Dropdown'
import useTransactionData from './hooks/useTransactionData'
import { Modal, useModal } from './Modal'
import { interactiveListCss } from "./Users"

const transactionFields = [
  { type: 'number', label: 'amount', },
  { type: 'text', label: 'description' }
]
const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif'
}
const colors = ['blue', 'green', 'purple', 'yellow']

const Transactions = () => {
  const { t } = useTranslation()
  const selectModalData = useModal()
  const editModalData = useModal()

  const { selectedUser, selectUser, users } = useUserData()
  const { selectedMerchant, selectMerchant, merchants } = useMerchantData()
  const { transactionsByMerchant, addTransaction, editTransaction, selectedTransaction, selectTransaction, deleteTransaction, transactions } = useTransactionData()
  const typeArr = [{ id: 'credit' }, { id: 'debit' }]
  const [type, setType] = useState(typeArr[0])
  const selectType = (val) => {
    setType(val)
  }
  const handleSubmit = () => {
    deleteTransaction({ variables: { id: selectedTransaction.id } })
  }
  const selectAndCloseModal = (transaction) => {
    selectTransaction(transaction)
    selectModalData.toggleOpen(false)
  }
  const setVals = () => {
    selectMerchant(selectedTransaction.merchant)
    selectUser(selectedTransaction.user)
    setType(selectedTransaction.credit ? typeArr[0] : typeArr[1])
  }
  return (
    <div>
      <h1>Transactions</h1>
      <h2>{t('test-key', "didn't work")}</h2>
      {transactions && (
        <PieChart
          data={Object.entries(transactionsByMerchant).map(([key, value], idx) => {
            return { title: key, value, color: colors[idx] }
          })}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={{ ...defaultLabelStyle }}
          style={{ height: '300px', width: '500px' }}
        />
      )}
      <div>
        {selectedTransaction && `Selected Transaction: ${selectedTransaction.description} ${selectedTransaction.amount} ${selectedTransaction.merchant.name} type: ${selectedTransaction.credit ? 'credit' : 'debit'}`}
      </div>
      <button onClick={handleSubmit} type='button'>Delete Transaction</button>
      <Modal.Button {...selectModalData} title="Select Transaction" />
      <Modal.Button {...editModalData} onClick={setVals} title="Edit Transaction" />

      <BasicForm
        fields={transactionFields}
        hiddenVals={{ merchantId: selectedMerchant?.id, userId: selectedUser?.id, credit: type.id === 'credit', debit: type.id === 'debit' }}
        name="Add Transaction"
        onSubmit={addTransaction}
      >
        <Dropdown data={users} handler={selectUser} name='User' propName='firstName' />
        <Dropdown data={merchants} handler={selectMerchant} name='Merchant' propName='name' />
        <Dropdown data={typeArr} name="Type" handler={selectType} propName='id' />
      </BasicForm>

      <Modal.Content {...selectModalData} title='Select Transaction'>
        <ul>
          {transactions?.map((transaction, idx) => {
            const key = idx
            return (
              <li css={interactiveListCss} key={key} onClick={() => selectAndCloseModal(transaction)}>
                {`${transaction.amount} - ${transaction.merchant.name}`}
              </li>
            )
          })}
        </ul>
      </Modal.Content>
      <Modal.Content {...editModalData} title='Edit Transaction'>
        <BasicForm
          fields={transactionFields.map((field) => {
            return { ...field, value: selectedTransaction?.[field.label] }
          })}
          hiddenVals={{ id: selectedTransaction?.id, merchantId: selectedMerchant?.id, userId: selectedUser?.id, credit: type.id === 'credit', debit: type.id === 'debit' }}
          onSubmit={editTransaction}
        >
          <Dropdown data={users} handler={selectUser} name='User' propName='firstName' initialSelect={selectedTransaction?.user.id} />
          <Dropdown data={merchants} handler={selectMerchant} name='Merchant' propName='name' initialSelect={selectedTransaction?.merchant.id} />
          <Dropdown data={typeArr} handler={selectType} propName='id' initialSelect={selectedTransaction?.credit ? 'credit' : 'debit'} />
        </BasicForm>
      </Modal.Content>
    </div>
  )
}

export default Transactions
