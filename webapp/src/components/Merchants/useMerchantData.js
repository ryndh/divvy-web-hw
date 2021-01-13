import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_MERCHANTS, ADD_MERCHANT, DELETE_MERCHANT } from '../../services/queries'

const useMerchantData = () => {
  const [selectedMerchant, setSelectedMerchant] = useState()
  const { loadingMerchant, queryError, data: merchantData, refetch } = useQuery(GET_MERCHANTS)
  const [addMerchant, { data: mutationData }] = useMutation(ADD_MERCHANT)
  const [deleteMerchant, { data: deleteMerchantData }] = useMutation(DELETE_MERCHANT)

  const selectMerchant = (val) => {
    setSelectedMerchant(val)
  }
  useEffect(() => {
    refetch()
  }, [mutationData, deleteMerchantData])
  useEffect(() => {
    if (merchantData) {
      setSelectedMerchant(merchantData.merchants[0])
    }
  }, [merchantData])

  return { selectedMerchant, selectMerchant, deleteMerchant, addMerchant, merchants: merchantData?.merchants, loadingMerchant, queryError }
}

export default useMerchantData
