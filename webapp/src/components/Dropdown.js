import React from 'react'
import { css } from '@emotion/core'

const dropDownCss = css`
  display: flex;
  justify-content: space-between;
`

const Dropdown = ({ handler, data, propName, initialSelect, name = '' }) => {
  return (
    <div css={dropDownCss}>
      {name ? <label htmlFor={name} >{name.toUpperCase()}</label> : <span />}
      <select id={name} initial onBlur={({ target }) => handler(data.find(val => val.id === target.value))}>
        {data?.map((obj, idx) => {
          const key = idx
          return (
            <option key={key} selected={initialSelect === obj.id} value={obj.id}>
              {Array.isArray(propName) ? propName.map((key) => obj[key]).join(' ') : obj[propName]}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Dropdown
