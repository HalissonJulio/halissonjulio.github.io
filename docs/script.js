window.onload = function() {

	const elementos = document.querySelectorAll("h2");
	const lista = document.querySelector("ol")

	elementos.forEach(elemento => {
		
		const listaLi = document.createElement("li");
		const link = document.createElement("a");

		link.textContent = elemento.textContent
		listaLi.appendChild(link)
		lista.append(listaLi)

		link.onclick = function() {
			let destino;
			for (i = 0; i < elementos.length; i++) {
				if (elementos[i].textContent == link.textContent) {
					destino = elementos[i]
					break
				}
			}
			destino.scrollIntoView()
		}

	})

	const voltarLista = document.getElementsByClassName("backlist")
	for (const button of voltarLista) {
		button.onclick = function() {
			document.getElementById("lista").scrollIntoView()
		}
	}

}
