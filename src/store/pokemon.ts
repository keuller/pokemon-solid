import { createState } from 'solid-js'

interface PokemonState {
    filter: string
    list: Pokemon[]
}

const [state, setState] = createState<PokemonState>({
    filter: '',
    list: []
})

export default {
    state,
    setState
}
