import { Component, For, createMemo } from 'solid-js'
import pokemonStore from '@/store/pokemon'

interface PokemonRowProp {
    pokemon: Pokemon
}

const PokemonRow: Component<PokemonRowProp> = (props) => {
    const p = props.pokemon
    return(
        <tr>
            <td>{p.name.english}</td>
            <td>{p.type.join(', ')}</td>
            <td style="text-align:center;">{p.base.HP}</td>
            <td style="text-align:center;">{p.base.Attack}</td>
            <td style="text-align:center;">{p.base.Speed}</td>
        </tr>
    )
}

export const PokemonTable: Component = () => {
    const getData = createMemo<Pokemon[]>((list = []) => {
        const filtered = pokemonStore.state.list.filter(p => p.name.english.toLowerCase().includes(pokemonStore.state.filter.toLowerCase()))
        return (list.length == filtered.length ? pokemonStore.state.list : filtered)
    })

    return (
        <table class="pm-table">
            <thead>
                <tr class="pm-table-header">
                    <th>Name</th>
                    <th>Type</th>
                    <th>HP</th>
                    <th>Attack</th>
                    <th>Speed</th>
                </tr>
            </thead>
            <tbody>
                <For each={getData()}>
                    {(item) => <PokemonRow pokemon={item} />}
                </For>
            </tbody>
        </table>
    )
}
