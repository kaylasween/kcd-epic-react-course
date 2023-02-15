// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, PokemonErrorBoundary, fetchPokemon} from '../pokemon'

const STATUS_STATES = {
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected'
}

function createResource(promise) {
  let status = STATUS_STATES.pending
  let result = promise.then(
    resolved => {
      status = STATUS_STATES.resolved
      result = resolved
    },
    rejected => {
      status = STATUS_STATES.rejected
      result = rejected
    }
  )
  return {
    read() {
      if(status === STATUS_STATES.pending) {
        throw result
      }
      if(status === STATUS_STATES.rejected) {
        throw result
      }
      if(status === STATUS_STATES.resolved) {
        return result
      }
      throw new Error('should not reach this')
    }
  }
}

const pokemonResource = createResource(fetchPokemon('pikachu'))

function PokemonInfo() {
  const pokemon = pokemonResource.read()

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<div>Loading...</div>}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
