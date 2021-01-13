import React from 'react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import Nav from './Nav'

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
})
