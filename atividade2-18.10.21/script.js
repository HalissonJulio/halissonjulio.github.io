window.onload = function() {

	const Elementos = document.querySelectorAll("h2");
	const Lista = document.querySelector("ol")

	Elementos.forEach(Elemento => {
		
		const ListaLI = document.createElement("li");
		const Link = document.createElement("a");

		Link.href = `#${Elemento.id}`
		Link.textContent = Elemento.textContent
		ListaLI.appendChild(Link)
		Lista.append(ListaLI)

	})
}