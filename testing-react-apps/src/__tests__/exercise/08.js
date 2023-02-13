// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
function TestCounterComponent() {
  const {count, increment, decrement} = useCounter()
  return (
    <>
      <button onClick={increment}>++</button>
      <button onClick={decrement}>--</button>
      <div>Count: {count}</div>
    </>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<TestCounterComponent/>)

  const incrementBtn = screen.getByRole('button', {name: '++'})
  const decrementBtn = screen.getByRole('button', {name: '--'})
  const countDisplay = screen.getByText(/Count:/i)

  expect(countDisplay).toHaveTextContent('Count: 0')

  await userEvent.click(incrementBtn)
  expect(countDisplay).toHaveTextContent('Count: 1')

  await userEvent.click(decrementBtn)
  expect(countDisplay).toHaveTextContent('Count: 0')
})

/* eslint no-unused-vars:0 */
