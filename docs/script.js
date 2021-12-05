const aumentarEm = 3 
const valorMinimo = 24
const valorMaximo = 49

function criaBotao(texto) {
	const botao = document.createElement("button")
	botao.setAttribute("type", "button")
	botao.setAttribute("name", "btn")
	botao.innerHTML = texto
	return botao
}

window.onload = function() {

	let elementoEncontrado = null
	const elementosProcurar = ["h1", "h2", "h3", "h4", "h5", "h6"]

	for (elemento in elementosProcurar) {
		elemento = elementosProcurar[elemento]
		if (document.querySelector(elemento)) {
			elementoEncontrado = document.querySelector(elemento)
			break
		}
	}
	if (!elementoEncontrado) { 
		return 
	}

	elementoEncontrado.parentElement.append(criaBotao("+"))
	elementoEncontrado.parentElement.append(criaBotao("-"))

	const botoes = document.getElementsByName("btn")
	botoes.forEach(botao => {
		botao.onclick = function() {
			const tamanho = parseFloat(window.getComputedStyle(elementoEncontrado, null).getPropertyValue('font-size'));
			if (botao.innerHTML == "+") {
				if (tamanho < valorMaximo) {
					elementoEncontrado.style.fontSize = (tamanho + aumentarEm) + "px"
				}
			} else {
				if (tamanho > valorMinimo) {
					elementoEncontrado.style.fontSize = (tamanho - aumentarEm) + "px"
				}
			}
		}
	})

}
