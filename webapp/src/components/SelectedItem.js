import React from 'react'
import { css } from '@emotion/core'

const boldCss = css`
  font-weight: 700;
`
const wrapCss = css`
  padding: 5px 30px;
  margin-bottom: 10px;
`

const SelectedItem = ({ loading = true, obj, title }) => {
  if (loading) return null
  return (
    <>
      <h3>{title}:</h3>
      <div css={wrapCss}>
        {Object.entries(obj).map(([key, value], idx) => {
          const k = idx
          return (
            <div key={k}>
              <span css={boldCss}>{key.split('_').join(' ')}</span>
              <span> – {value}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SelectedItem
