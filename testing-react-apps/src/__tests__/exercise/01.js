// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {
  const container = document.createElement('div')
  document.body.append(container)

  act(() => createRoot(container).render(<Counter />))

  const buttons = container.querySelectorAll('button')
  const increment = buttons[1]
  const decrement = buttons[0]

  const message = container.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')

  act(() => increment.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0
  })))
  expect(message.textContent).toBe('Current count: 1')

  act(() => decrement.click())
  expect(message.textContent).toBe('Current count: 0')

  container.remove()
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
