import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'

const navStyle = css`
  grid-row: 1;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-child) {
    margin-left: 16px;
  }
`

const Nav = () => {
  return (
    <Fragment>
      <nav css={navStyle}>
        <ul >
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          <li>
            <Link to='/merchants'>Merchants</Link>
          </li>
          <li>
            <Link to='/transactions'>Transactions</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}

export default Nav
