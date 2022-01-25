const ul = document.getElementById("cityList");
const input = document.getElementById('ddd');

input.addEventListener("input", buscaDadosApi);
function buscaDadosApi(evento) {
    fetch(`https://brasilapi.com.br/api/ddd/v1/${evento.target.value}`)
        .then(resposta => resposta.json())
        .then(preencheLista)
        .catch(requestError);
}

function requestError({ message }) {
    ul.replaceChildren(createItemEl(message));
}

function preencheLista(dados) {
    if (dados.cities) {
        const items = dados.cities.map(createItemEl);
        if (items.length) return ul.replaceChildren(...items);
    }

    requestError(dados)
}

function createItemEl(itemValue) {
    const li = document.createElement("li");
    li.innerText = itemValue;
    return li;
}
