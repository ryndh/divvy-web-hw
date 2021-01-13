import React, { Fragment } from 'react'
import BasicForm from '../BasicForm'
import Dropdown from '../Dropdown'
import useMerchantData from './useMerchantData'
import { Modal, useModal } from '../Modal'
import { interactiveListCss } from '../Users/Users'

const merchantFields = [
  { type: 'text', label: 'name' },
  { type: 'text', label: 'description' }
]

const Merchants = () => {
  const modalData = useModal()
  const { selectedMerchant, addMerchant, deleteMerchant, selectMerchant, loadingMerchant, queryError, merchants } = useMerchantData()

  const handleSubmit = () => {
    deleteMerchant({ variables: { id: selectedMerchant.id } })
  }
  const selectAndCloseModal = (merch) => {
    selectMerchant(merch)
    modalData.toggleOpen(false)
  }

  return (
    <div>
      <h1>Merchants</h1>

      {loadingMerchant && 'Loading Merchants!'}
      {queryError && 'Error!'}
      <div>
        {selectedMerchant && `Selected Merchant: ${selectedMerchant.name} - ${selectedMerchant.description}`}
      </div>
      <button onClick={handleSubmit} type='button'>Delete Merchant</button>
      <Modal.Button {...modalData} title="Select Merchant" />
      <BasicForm fields={merchantFields} name='Add Merchant' onSubmit={addMerchant} />

      <Modal.Content {...modalData} title='Select Merchant'>
        <ul>
          {merchants?.map((merchant, idx) => {
            const key = `${merchant.name}${idx}`
            return (
              <li css={interactiveListCss} key={key} onClick={() => selectAndCloseModal(merchant)}>
                {`${merchant.name} - ${merchant.description}`}
              </li>
            )
          })}
        </ul>
      </Modal.Content>
    </div>
  )
}

export default Merchants
