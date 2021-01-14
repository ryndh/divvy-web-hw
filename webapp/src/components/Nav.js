import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { colors } from '../colors'

const navStyleCss = css`
  display: flex;
  align-items: center;
  height: 40px;
  background: ${colors.nav.background};
  li {
    margin: 0px 8px;
  }
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
`
const listStyleCss = css`
  display: flex;
`

const Nav = () => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <nav css={navStyleCss}>
        <ul css={listStyleCss}>
          <li>
            <Link to='/'>{t('home-link')}</Link>
          </li>
          <li>
            <Link to='/users'>{t('users-link')}</Link>
          </li>
          <li>
            <Link to='/merchants'>{t('merchants-link')}</Link>
          </li>
          <li>
            <Link to='/transactions'>{t('transactions-link')}</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}

export default Nav
