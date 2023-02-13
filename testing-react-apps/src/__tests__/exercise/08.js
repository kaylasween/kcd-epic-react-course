// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows customization of initial count', async () => {
  let result
  function TestComponent() {
    result = useCounter({initialCount: 5})
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(5)

  act(() => result.increment())
  expect(result.count).toBe(6)

  act(() => result.decrement())
  expect(result.count).toBe(5)
})

test('allows customization of step count', async () => {
  let result
  function TestComponent() {
    result = useCounter({step: 3})
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(3)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})
