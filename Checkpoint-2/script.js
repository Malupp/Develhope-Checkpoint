const url = "https://pokeapi.co/api/v2/pokemon/"
let pokeAbilities = document.getElementById('abilities')
let pokeExp = document.getElementById('exp')
let pokeName = document.getElementById('name')
let pokeColor = document.getElementById('color')
let pokeGroup = document.getElementById('group')
let pokeShape = document.getElementById('shape')

const pokemon = async () => {
    try {
        let poke = document.getElementById('pokemon').value
        const res = await fetch(`${url}${poke}`)
        const {abilities, base_experience, forms} = await res.json()
        pokeAbilities.innerText = abilities.map((el) => el.ability.name).join();
        pokeExp.innerText = base_experience;
        pokeName.innerText = forms[0].name;
        const imgSprites = await fetch(`${forms[0].url}`)
        const {sprites} = await imgSprites.json()
        document.querySelector('img').setAttribute('src', sprites.front_default)
    } catch (error) {
        alert("Il pokemon digitato non esiste")
        window.location.reload()
        
        
    }
}

const moreInfoPoke = async() => {
    try {
        let poke = document.getElementById('pokemon').value
        const res = await fetch(`${url}${poke}`)
        const {species} = await res.json()
        const info = await fetch(`${species.url}`)
        const {color, egg_groups, shape} = await info.json()
        pokeColor.innerText = color.name;
        pokeGroup.innerText = egg_groups.map((el) => el.name);
        pokeShape.innerText = shape.name;
    } catch (error) {
        
    }
}

const btnGen = document.getElementById('btnGen').onclick = () => pokemon()
const moreInfo = document.getElementById('moreInfo').onclick = () => moreInfoPoke()