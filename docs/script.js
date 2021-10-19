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

    const paragrafos = document.querySelectorAll("p")
    paragrafos.forEach(paragrafo => {

        const h3 = document.createElement("h3")
        const retorno = document.createElement("a")

        retorno.textContent = "Clique aqui para voltar à lista"
        h3.appendChild(retorno)

        paragrafo.parentElement.insertBefore(h3, paragrafo.nextSibling)
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
