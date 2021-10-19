window.onload = function() {

    const elementos = document.querySelectorAll("h2");
    const lista = document.querySelector("ol")

    elementos.forEach(elemento => {
        
        const listaLi = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = elemento.textContent
        listaLi.appendChild(link)
        lista.append(listaLi)

    })

    const links = document.querySelectorAll("a")
    links.forEach(link => {
        link.onclick = function() {
            if(link.innerHTML == "Clique aqui para voltar à lista") {
                document.querySelector("h3").scrollIntoView()
            } else {
                let destino;
                for (i = 0; i < elementos.length; i++) {
                    if (elementos[i].textContent == link.textContent) {
                        destino = elementos[i]
                        break
                    }
                }
                destino.scrollIntoView()
            }
        }
    })

    
}
