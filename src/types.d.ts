interface Pokemon {
    id: number
    name: {
        english: string
        french: string
    }
    base: {
        HP: number
        Attack: number
        Speed: number
    }
    type: string[]
}
