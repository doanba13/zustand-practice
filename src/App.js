import './App.css';
import create from "zustand";
import {useEffect} from "react";

const POKEMON_URL = 'https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/f8d792f5b2cf97eaaf9f0c2119918f333e348823/pokemon.json';

const useStore = create(set => ({
    pokemon: [],
    filter: '',
    setFilter: (filter) => set({filter}),
    setPokemon: pokemon => set({pokemon}),
}));

const FilterInput = () => {
    const {filter, setFilter} = useStore(state => state);

    const onChangeHandler = (e) => {
        setFilter(e.target.value)
    }

    return(
        <input value={filter} onChange={onChangeHandler}/>
    )
}

const PokemonTable = () => {
    const {pokemon, filter} = useStore(state => state)

    return(
        <table style={{width: '80%'}}>
            <tbody>
            {pokemon
                .filter(({name: {english}}) => english.toLowerCase().includes(filter.toLowerCase()))
                .map(({id, name: {english}, type}) => (
                <tr key={id}>
                    <td>{english}</td>
                    <td>{type.toString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

function App() {
    const { setPokemon } = useStore(state => state);

    useEffect(() => {
        fetch(POKEMON_URL)
            .then(res => res.json())
            .then(pokemon => setPokemon(pokemon))
    }, [])

  return (
    <div className="App">
      <FilterInput/>
        <div>
            <PokemonTable/>
        </div>
    </div>
  );
}

export default App;
