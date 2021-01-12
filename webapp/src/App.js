import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home, Users, Merchants, Nav, Transactions } from './components'

const App = () => {
  return (
    <Router>
      <div css={layoutStyle}>
        <Nav />
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Users} exact path='/users' />
          <Route component={Merchants} exact path='/merchants' />
          <Route component={Transactions} exact path='/transactions' />
        </div>
      </div>
    </Router>
  )
}

export default App

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
    padding: 8px;
`

const contentStyle = css`
  grid-row: 2;
`
