const pokemonName = document.querySelector('.pokemon_name');//constante global para os nomes dos pokemons
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.image_pokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {//Função q pesquisa os pokemons
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);//api onde tem tudo sobre os pokemons

    if(APIResponse.status == 200){
        const data = await APIResponse.json();//json para extrair os dados da api
        return data;//retorna os dados do pokemo
    }

}

const renderPokemon = async (pokemon) => {//função para informar os dados do pokemon e imagens
   
    pokemonName.innerHTML = 'Loading...';//vai aparecer enquanto await(espera achar os dados do pokemon)
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon (pokemon);//await serve para espera de pesquisar os dados

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;//nome atraves da api
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];//endereço do gif da api
        input.value='';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found mb :(';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) =>{//formulário da pesquisa(onde aparece os pokemons)
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
