// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async() => {
  // let submittedData
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()

  // const username = faker.internet.userName()
  // const password = faker.internet.password()

  const buildLoginForm = (customInput = {}) => {
    return {
      username: customInput.username ? customInput.username : faker.internet.userName(),
      password: customInput.password ? customInput.password : faker.internet.password()
    }
  }

  const {username, password} = buildLoginForm({password: '12345'})

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)

  // 🐨 get the username and password fields via `getByLabelText`
  const userNameInput = screen.getByLabelText('Username')
  const passwordInput = screen.getByLabelText('Password')
  const submitBtn = screen.getByRole('button', {name: 'Submit'})
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  await userEvent.type(userNameInput, username)
  await userEvent.type(passwordInput, password)

  await userEvent.click(submitBtn)
  
  // expect(submittedData).toEqual({username: 'username', password: 'password123'})
  expect(handleSubmit).toHaveBeenCalledWith({username, password})
})

/*
eslint
  no-unused-vars: "off",
*/
