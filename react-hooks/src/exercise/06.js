// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: pokemonName ? 'pending' : 'idle'
  })

  React.useEffect(() => {
    if(!pokemonName) {
      return
    }
    setState({
      pokemon: null,
      error: null,
      status: 'pending'
    })

    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({
          pokemon,
          status: 'resolved'
        })
      }
    ).catch(err => {
      setState({
        error: err,
        status: 'rejected'
      })
    })
  }, [pokemonName])

  if(state.status === 'rejected') {
    throw state.error
  } else if (state.status === 'idle') {
    return 'Submit a Pokemon!'
  } else if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={state.pokemon} />
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  if (error) {
    // You can render any custom fallback UI
    return ( 
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre> 
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
