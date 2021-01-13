import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home, Users, Merchants, Nav, Transactions } from './components'
import Styles from './Styles'

const appWrapCss = css`
  margin: 5px 10px;
  display: flex;
  flex-direction: column;
  padding: 0px 100px;
  align-items: center;
`

const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading</h1>}>
        <Styles>
          <Nav />
          <div css={appWrapCss}>
            <Route exact component={Home} path='/' />
            <Route exact component={Users} path='/users' />
            <Route exact component={Merchants} path='/merchants' />
            <Route exact component={Transactions} path='/transactions' />
          </div>
        </Styles>
      </Suspense>
    </Router>
  )
}

export default App
