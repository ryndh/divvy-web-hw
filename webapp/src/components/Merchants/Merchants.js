import React, { Fragment } from 'react'
import BasicForm from '../BasicForm'
import Dropdown from '../Dropdown'
import useMerchantData from './useMerchantData'

const merchantFields = [
  { type: 'text', label: 'name' },
  { type: 'text', label: 'description' }
]

const Merchants = () => {
  const { selectedMerchant, addMerchant, deleteMerchant, selectMerchant, loadingMerchant, queryError, merchants } = useMerchantData()

  const handleSubmit = () => {
    deleteMerchant({ variables: { id: selectedMerchant } })
  }

  return (
    <Fragment>
      <h1>Merchants</h1>
      {loadingMerchant && 'Loading Merchants!'}
      {queryError && 'Error!'}
      <Dropdown data={merchants} handler={selectMerchant} name='merchants' propName='name' />
      <button onClick={handleSubmit} type='button'>Delete Merchant</button>
      <BasicForm fields={merchantFields} name='Add Merchant' onSubmit={addMerchant} />
    </Fragment>
  )
}

export default Merchants
