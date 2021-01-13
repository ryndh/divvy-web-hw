import React from 'react'
import { Global, css } from '@emotion/core'
import { colorsCss, colors } from './colors'

const globalStyles = css`
  body {
    margin: 0;
    ${colorsCss}

    li {
      list-style: none;
    }
    a {
      text-decoration: none;
      color: ${colors.links}
    }
    #portal-mount {
      position: fixed;
      top: 0px;
      left: 0px;
    }
  }
`

const Styles = ({ children }) => {
  return (
    <div>
      <Global styles={globalStyles} />
      {children}
    </div>
  )
}

export default Styles
