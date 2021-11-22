const tamanhoCelula = 40;

let selecionando = false
let pecaSelecionada = null
let movimentoAnterior = null

let pecaId = 0;
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);

            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black';
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black'));
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}

function deletaPeca(peca) {
   peca.remove()
}

function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    imagem.setAttribute('cor', cor)
    return imagem;
}

function mudaCor(movimentos, cor) {
    for (movimento in movimentos) {
        const celula = movimentos[movimento]
        celula.style.backgroundColor = cor
    }
}

function procurarMovimentos(peca) {

    const movimentos = {
        cimaDireita: null,
        baixoDireita: null,
        cimaEsquerda: null,
        baixoEsquerda: null
    }
    const movimentosValidos = {}

    const localPeca = peca.parentElement.cellIndex

    const celulaAtual = peca.parentElement
    const celulaCima = celulaAtual.parentElement.previousSibling
    const celulaBaixo = celulaAtual.parentElement.nextSibling

    if (celulaCima) { 
        if (celulaCima.cells[localPeca]+1) {
            movimentos["cimaDireita"] = celulaCima.cells[localPeca+1] 
        }
        if (celulaCima.cells[localPeca-1]) {
            movimentos["cimaEsquerda"] = celulaCima.cells[localPeca-1] 
        }
    }
    if (celulaBaixo) { 
        if (celulaBaixo.cells[localPeca+1]) {
            movimentos["baixoDireita"] = celulaBaixo.cells[localPeca+1] 
        }
        if (celulaBaixo.cells[localPeca-1]) {
            movimentos["baixoEsquerda"] = celulaBaixo.cells[localPeca-1] 
        }
    }

    for (movimento in movimentos) {
        if (movimentos[movimento] && !movimentos[movimento !== null] && !movimentos[movimento].firstChild) {
            movimentosValidos[movimento] = movimentos[movimento]
        }
    }

    movimentoAnterior = movimentosValidos
    return movimentosValidos

}

function movePeca(peca, movimentos, local) {
    const cor = peca.getAttribute("cor")
    for (i in movimentos) {
        if (movimentos[i].isEqualNode(local)) {

            deletaPeca(peca)
            local.append(criaPeca(cor))
            mudaCor(movimentoAnterior, "black")

            selecionando = false
            pecaSelecionada = null

            break
        }
    }
}

document.body.addEventListener("click", function(evento) {

    if (!selecionando) {
        if(evento.target.tagName == "IMG") {

            selecionando = true
            pecaSelecionada = evento.target

            const movimentos = procurarMovimentos(evento.target)
            mudaCor(movimentos, "lime")
        }
    } else {
        if (evento.target.tagName == "IMG") {

            if(evento.target == pecaSelecionada) {
                selecionando = false
                pecaSelecionada = null
                mudaCor(movimentoAnterior, "black")
            } else {
                pecaSelecionada = evento.target
                mudaCor(movimentoAnterior, "black")

                const movimentos = procurarMovimentos(evento.target)
                mudaCor(movimentos, "lime")
            }
        }

        if (evento.target.tagName == "TD") {
            movePeca(pecaSelecionada, movimentoAnterior, evento.target)
        }
    }

})
