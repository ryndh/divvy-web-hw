import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home, Users, Merchants, Nav, Transactions } from './components'
import Styles from './Styles'

const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading</h1>}>
        <Styles>
          <Nav />
          <Route component={Home} exact path='/' />
          <Route component={Users} exact path='/users' />
          <Route component={Merchants} exact path='/merchants' />
          <Route component={Transactions} exact path='/transactions' />
        </Styles>
      </Suspense>
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
