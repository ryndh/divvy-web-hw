import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <h1>{t('home-page')}</h1>
    </Fragment>
  )
}

export default Home
