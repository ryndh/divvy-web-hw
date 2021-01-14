import React from 'react'
import { useTranslation } from 'react-i18next'
import BasicForm from './BasicForm'
import { useMerchantData } from './hooks'
import { Modal, useModal } from './Modal'
import { interactiveListCss } from './Users'
import SelectedItem from './SelectedItem'

const merchantFields = [
  { type: 'text', label: 'name' },
  { type: 'text', label: 'description' }
]

const Merchants = () => {
  const { t } = useTranslation()
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
      {/* <h1>{t('merchants-heading')}</h1> */}

      {loadingMerchant && t('loading')}
      {queryError && t('error')}
      <SelectedItem
        loading={!selectedMerchant}
        title="Selected Merchant"
        obj={{
          Name: selectedMerchant?.name,
          Description: selectedMerchant?.description,
        }}
      />
      <button onClick={handleSubmit} type='button'>{t('delete-merchant')}</button>
      <Modal.Button {...modalData} title={t('select-merchant')} />
      <BasicForm fields={merchantFields} name={t('add-merchant')} onSubmit={addMerchant} />

      <Modal.Content {...modalData} title={t('select-merchant')}>
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
