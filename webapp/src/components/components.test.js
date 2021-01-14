import React from 'react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import Nav from './Nav'
import Dropdown from './Dropdown'

const dropdownProps = {
  data: [{ id: 'item 1' }, { id: 'item 2' }, { id: 'item 3' }],
  handler: jest.fn(),
  initialSelect: 'item 1',
  name: 'My Dropdown Component',
  propName: 'id'
}

describe('Simple Tests', () => {
  it('Users link is visible', async () => {
    const component = render(
      <Router>
        <Nav />
      </Router>
    )
    const link = await component.findByText(`Users`)

    expect(link).toBeVisible()
  })

  it('Dropdown shows title', async () => {
    const component = render(
      <Dropdown {...dropdownProps} />
    )
    const title = await component.findByText(dropdownProps.name, { exact: false })

    expect(title).toBeVisible()
  })

  it('Dropdown calls function', async () => {
    const component = render(
      <Dropdown {...dropdownProps} />
    )
    const input = await component.findByTestId('dropdown')

    fireEvent.blur(input)

    expect(dropdownProps.handler).toHaveBeenCalled()
  })
})
