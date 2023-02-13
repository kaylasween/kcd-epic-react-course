// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup({initialProps} = {}) {
  const result = {}
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return result
}

test('exposes the count and increment/decrement functions', async () => {
  const result = setup()
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of initial count', async () => {
  const result = setup({initialProps: { initialCount: 5 }})
  expect(result.current.count).toBe(5)

  act(() => result.current.increment())
  expect(result.current.count).toBe(6)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(5)
})

test('allows customization of step count', async () => {
  const result = setup({initialProps: { step: 3 }})
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(3)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
