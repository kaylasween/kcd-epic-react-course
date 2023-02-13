// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {screen} from '@testing-library/react'
import {render} from '../../test/test-utils'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// function renderWithStyles(theme) {
//   render(
//     <ThemeProvider initialTheme={theme}>
//       <EasyButton>Easy</EasyButton>
//     </ThemeProvider>
//   )
// }

const styles = {
  dark: `
    background-color: black;
    color: white;
  `,
  light: `
    color: black;
    background-color: white;
  `,
}

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>, {theme: 'light'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(styles.light)
})

test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(styles.dark)
})

/* eslint no-unused-vars:0 */
