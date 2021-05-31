import { Component } from 'solid-js'
import pokemonStore from '@/store/pokemon'

export const Filter: Component = (props) => (
    <input type="text"
        class="filter-input"
        maxLength={50}
        onInput={(ev) => pokemonStore.setState('filter', ev.target.value)} />
)
