import React from 'react'

const Dropdown = ({ name, handler, data, propName }) => {
  return (
    <select name={name} onBlur={({ target }) => handler(target.value)}>
      {data?.map((obj, idx) => {
        const key = idx
        return (
          <option key={key} value={obj.id}>
            {Array.isArray(propName) ? propName.map((key) => obj[key]).join(' ') : obj[propName]}
          </option>
        )
      })}
    </select>
  )
}

export default Dropdown
