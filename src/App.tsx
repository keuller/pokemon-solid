import { JSX, createEffect } from 'solid-js'
import { AppTitle } from '@/components/AppTitle'
import { Filter } from '@/components/Filter'
import { PokemonTable } from '@/components/PokemonTable'
import pokemonStore from '@/store/pokemon'
import './App.css'

const URL = 'https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/f8d792f5b2cf97eaaf9f0c2119918f333e348823/pokemon.json';

export default function App(): JSX.Element {
    createEffect(() => {
        fetch(URL)
          .then(data => data.json())
          .then(json => pokemonStore.setState('list', json))
    })

    return (
        <div class="container">
            <AppTitle />

            <Filter />

            <PokemonTable />
        </div>
    )
}
