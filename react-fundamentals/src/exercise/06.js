// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  const inputRef = React.useRef()
  const [username, setUsername] = React.useState('')
  // const [error, setError] = React.useState(null)

  const handleChange = (event) => {
    // const isValid = event.target.value === event.target.value.toLowerCase()
    // setError(isValid ? null : 'Username must be lower case')
    setUsername(event.target.value.toLowerCase())
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmitUsername(inputRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
      {/* {error ? <div role="alert">{error}</div> : null} */}
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" value={username} ref={inputRef} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
