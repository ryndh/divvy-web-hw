import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/core'
import { PieChart } from 'react-minimal-pie-chart'
import BasicForm from './BasicForm'
import { useMerchantData, useUserData } from './hooks'
import Dropdown from './Dropdown'
import useTransactionData from './hooks/useTransactionData'
import { Modal, useModal } from './Modal'
import { interactiveListCss } from './Users'
import SelectedItem from './SelectedItem'

const buttonCss = css`
  appearance: none;
  color: none;
  border: none;
  color: black;
  background: none;
  margin-bottom: 3px;
`
const boldCss = css`
  font-weight: 700;
`
const pieCss = css`
  overflow: visible;
`
const transactionFields = [
  { label: 'amount', type: 'number' },
  { label: 'description', type: 'text' }
]
const defaultLabelStyle = {
  fontFamily: 'sans-serif',
  fontSize: '5px'
}
const colors = ['#39d7f1', '#2fcc2d', '#461d7c', '#e5f324', '#ebac1b']

const Transactions = () => {
  const { t } = useTranslation()
  const selectModalData = useModal()
  const editModalData = useModal()

  const { selectUser, selectedUser, users } = useUserData()
  const { merchants, selectMerchant, selectedMerchant } = useMerchantData()
  const { addTransaction, deleteTransaction, editTransaction, selectTransaction, selectedTransaction, transactions, transactionsByMerchant } = useTransactionData()
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
      <h1>{t('transactions-link')}</h1>
      {transactions && (
        <PieChart
          animate
          css={pieCss}
          data={Object.entries(transactionsByMerchant).map(([key, value], idx) => {
            return { color: colors[idx], title: key, value }
          })}
          label={({ dataEntry }) => `${dataEntry.title} – ${dataEntry.value} Transactions`}
          labelPosition={110}
          labelStyle={{ ...defaultLabelStyle }}
          lineWidth={30}
          segmentsShift={1}
          style={{ height: '300px', width: '500px' }}
        />
      )}
      <SelectedItem
        loading={!selectedTransaction}
        obj={{
          Amount: selectedTransaction?.amount,
          Description: selectedTransaction?.description,
          Merchant: selectedTransaction?.merchant.name,
          Type: selectedTransaction?.credit ? 'Credit' : 'Debit'
        }}
        title={t('selected-transaction')}
      />
      <button type='button' onClick={handleSubmit}>{t('delete-transaction')}</button>
      <Modal.Button {...selectModalData} title={t('select-transaction')} />
      <Modal.Button {...editModalData} title={t('edit-transaction')} onClick={setVals} />

      <BasicForm
        fields={transactionFields}
        hiddenVals={{ credit: type.id === 'credit', debit: type.id === 'debit', merchantId: selectedMerchant?.id, userId: selectedUser?.id }}
        name={t('add-transaction')}
        onSubmit={addTransaction}
      >
        <Dropdown data={users} handler={selectUser} name='User' propName='firstName' />
        <Dropdown data={merchants} handler={selectMerchant} name='Merchant' propName='name' />
        <Dropdown data={typeArr} handler={selectType} name="Type" propName='id' />
      </BasicForm>

      <Modal.Content {...selectModalData} title={t('select-transaction')}>
        <ul>
          {transactions?.map((transaction, idx) => {
            const key = idx
            return (
              <li key={key} css={interactiveListCss} >
                <button css={buttonCss} onClick={() => selectAndCloseModal(transaction)}>
                  <span><span css={boldCss}>Merchant: </span>{transaction.merchant.name} </span>
                  <span><span css={boldCss}>Amount: </span> {transaction.amount}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </Modal.Content>
      <Modal.Content {...editModalData} title={t('edit-transaction')}>
        <BasicForm
          fields={transactionFields.map((field) => {
            return { ...field, value: selectedTransaction?.[field.label] }
          })}
          hiddenVals={{ credit: type.id === 'credit', debit: type.id === 'debit', id: selectedTransaction?.id, merchantId: selectedMerchant?.id, userId: selectedUser?.id }}
          onSubmit={editTransaction}
        >
          <Dropdown data={users} handler={selectUser} initialSelect={selectedTransaction?.user.id} name='User' propName='firstName' />
          <Dropdown data={merchants} handler={selectMerchant} initialSelect={selectedTransaction?.merchant.id} name='Merchant' propName='name' />
          <Dropdown data={typeArr} handler={selectType} initialSelect={selectedTransaction?.credit ? 'credit' : 'debit'} propName='id' />
        </BasicForm>
      </Modal.Content>
    </div>
  )
}

export default Transactions
