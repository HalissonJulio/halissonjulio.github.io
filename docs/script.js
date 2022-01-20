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

function procuraInimigo(celula, peca, cor, operacao, local) {
    let novoLocal = null;
    
    if (operacao == "+") {
        novoLocal = celula.cells[peca+1] ? celula.cells[peca+1] : null
        if (local == "cima") {

            if (!celula.previousSibling) return novoLocal
            if (!celula.cells[peca+1] || !celula.cells[peca+1].firstChild) return novoLocal

            const inimigo = celula.cells[peca+1]?. firstChild ?? null
            if (inimigo.getAttribute("cor") == cor) return novoLocal

            novoLocal = celula.previousSibling.cells[peca+2]

        } else {

            if (!celula.previousSibling) return novoLocal
            if (!celula.cells[peca+1] || !celula.cells[peca+1].firstChild) return novoLocal

            const inimigo = celula.cells[peca+1].firstChild
            if (inimigo.getAttribute("cor") == cor) return novoLocal

            novoLocal = celula.nextSibling.cells[peca+2]

        }

    } 

    if (operacao == "-") {
        novoLocal = celula.cells[peca-1] ? celula.cells[peca-1] : null
        if (local == "cima") {

            if (!celula.previousSibling) return novoLocal
            if (!celula.cells[peca-1] || !celula.cells[peca-1].firstChild) return novoLocal

            const inimigo = celula.cells[peca-1].firstChild
            if (inimigo.getAttribute("cor") == cor) return novoLocal

            novoLocal = celula.previousSibling.cells[peca-2]

        } else {

            if (!celula.previousSibling) return novoLocal
            if (!celula.cells[peca-1] || !celula.cells[peca-1].firstChild) return novoLocal

            const inimigo = celula.cells[peca-1].firstChild
            if (inimigo.getAttribute("cor") == cor) return novoLocal

            novoLocal = celula.nextSibling.cells[peca-2]

        }
    }

    return novoLocal

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
    const minhaCor = peca.getAttribute("cor")

    if (celulaCima) { 
        if (celulaCima.cells[localPeca]+1) {
            const novoMovimento = procuraInimigo(celulaCima, localPeca, minhaCor, "+", "cima")
            movimentos["cimaDireita"] = novoMovimento
        }
        if (celulaCima.cells[localPeca-1]) {
            const novoMovimento = procuraInimigo(celulaCima, localPeca, minhaCor, "-", "cima")
            movimentos["cimaEsquerda"] = novoMovimento
        }
    }
    if (celulaBaixo) { 
        if (celulaBaixo.cells[localPeca+1]) {
            const novoMovimento = procuraInimigo(celulaBaixo, localPeca, minhaCor, "+", "baixo")
            movimentos["baixoDireita"] = novoMovimento
        }
        if (celulaBaixo.cells[localPeca-1]) {
            const novoMovimento = procuraInimigo(celulaBaixo, localPeca, minhaCor, "-", "baixo")
            movimentos["baixoEsquerda"] = novoMovimento
        }
    }

    for (movimento in movimentos) {
        if (movimentos[movimento] && !movimentos[movimento] !== null && !movimentos[movimento].firstChild) {
            movimentosValidos[movimento] = movimentos[movimento]
        }
    }

    movimentoAnterior = movimentosValidos
    return movimentosValidos

}

function movePeca(peca, movimentos, local) {

    const cor = peca.getAttribute("cor")

    const celulaCima = local.parentElement.nextSibling
    const celulaBaixo = local.parentElement.previousSibling

    const movimentosFunc = {
        cimaDireita: function() {
            const localAnterior = celulaCima.cells[local.cellIndex-1]

            const inimigo = localAnterior.firstChild
            if (inimigo && inimigo.getAttribute("cor") !== cor) {
                deletaPeca(inimigo)
            }

        },
        cimaEsquerda: function() {
            const localAnterior = celulaCima.cells[local.cellIndex+1]

            const inimigo = localAnterior.firstChild
            if (inimigo && inimigo.getAttribute("cor") !== cor) {
                deletaPeca(inimigo)
            }

        },
        baixoDireita: function() {
            const localAnterior = celulaBaixo.cells[local.cellIndex-1]

            const inimigo = localAnterior.firstChild
            if (inimigo && inimigo.getAttribute("cor") !== cor) {
                deletaPeca(inimigo)
            }
        },
        baixoEsquerda: function() {
            const localAnterior = celulaBaixo.cells[local.cellIndex+1]

            const inimigo = localAnterior.firstChild
            if (inimigo && inimigo.getAttribute("cor") !== cor) {
                deletaPeca(inimigo)
            }
        }
    }

    for (i in movimentos) {
        const Elemento = movimentos[i]
        if (Elemento === local) {
            
            peca.parentElement.style.backgroundColor = "Black"

            deletaPeca(peca)
            local.append(criaPeca(cor))


            if (movimentosFunc[i]) movimentosFunc[i]()
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
            pecaSelecionada.parentElement.style.backgroundColor = "LightSkyBlue"

            const movimentos = procurarMovimentos(evento.target)
            mudaCor(movimentos, "LightGreen")
        }
    } else {
        if (evento.target.tagName == "IMG") {

            if(evento.target == pecaSelecionada) {
                pecaSelecionada.parentElement.style.backgroundColor = "black"
                selecionando = false
                pecaSelecionada = null
                mudaCor(movimentoAnterior, "black")
            } else {
                pecaSelecionada.parentElement.style.backgroundColor = "black"
                pecaSelecionada = evento.target
                pecaSelecionada.parentElement.style.backgroundColor = "LightSkyBlue"
                mudaCor(movimentoAnterior, "black")

                const movimentos = procurarMovimentos(evento.target)
                mudaCor(movimentos, "LightGreen")
            }
        }

        if (evento.target.tagName == "TD") {
            movePeca(pecaSelecionada, movimentoAnterior, evento.target)
        }
    }

})
