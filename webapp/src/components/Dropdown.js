import React from 'react'
import { css } from '@emotion/core'

const dropDownCss = css`
  display: flex;
  justify-content: space-between;
`

const Dropdown = ({ data, handler, initialSelect, name = '', propName }) => {
  return (
    <div css={dropDownCss}>
      {name ? <label htmlFor={name} >{name.toUpperCase()}</label> : <span />}
      <select data-testid='dropdown' defaultValue={initialSelect} id={name} onBlur={({ target }) => handler(data.find(val => val.id === target.value))}>
        {data?.map((obj, idx) => {
          const key = idx
          return (
            <option key={key} value={obj.id}>
              {Array.isArray(propName) ? propName.map((key) => obj[key]).join(' ') : obj[propName]}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Dropdown
