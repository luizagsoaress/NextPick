    "use strict"

    async function chamadaApiFavoritos(){
        const token = localStorage.getItem("token");
        if(!token) return;

        const res = await fetch("https://api-nextpick.onrender.com/carregarFavoritos", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        });

        const data = await res.json();

        if(data.success) {
        return data;
        } else {
        }
    }

    async function desenharFav() {
        const chamada = await chamadaApiFavoritos();
        const f = chamada.favoritos;
        const postersFilmes = document.querySelector('.favoritos_filme');
        const postersSeries = document.querySelector('.favoritos_serie');
        const qtdFilmes = document.querySelector('.qtd_filmes_fav');
        const qtdSeries = document.querySelector('.qtd_series_fav');

        let fT = 0;
        let sT = 0;

        for(let i = 0; i < f.length; i++) {
        if(f[i].favorito[0].tipo === 'filme') {
            fT++;
            const div = document.createElement("div");
            div.style.width = '140px';
            div.style.minWidth = '140px'; 
            div.style.height = '200px';
            div.style.backgroundColor = 'white';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.textDecoration = 'none';
            div.style.transition = 'all 0.3s ease';
            div.style.position = 'relative';
            div.style.border = 'none';
            div.style.margin = '0';
            div.style.padding = '0';
            div.style.flexDirection = "column";
            div.style.marginBottom = "70px";
            div.style.border = '1px solid #e3e3e3';
            
            const img = document.createElement("img");
            img.src = f[i].favorito[0].poster;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.border = 'none';
            img.style.display = 'block';
            img.style.zIndex = '2';

            const divTitulo  = document.createElement("div");
            divTitulo.style.width = '138px';
            divTitulo.style.height = '110px';
            divTitulo.style.backgroundColor = 'transparent';
            divTitulo.style.display = 'flex';
            divTitulo.style.alignItems = 'flex-start';
            divTitulo.style.justifyContent = 'center';
            divTitulo.style.flexDirection = 'column';
            divTitulo.style.gap = '4px';
            divTitulo.style.position = 'absolute';
            divTitulo.style.bottom = '-100px';
            divTitulo.style.border = '1px solid #e3e3e3';
            divTitulo.style.borderRadius = '10px';

            const titulo = document.createElement("span");
            titulo.textContent = f[i].favorito[0].titulo;
            titulo.style.color = 'black';
            titulo.style.fontSize = '14px';
            titulo.style.fontWeight = 'bold';
            titulo.style.alignSelf = 'left';
            titulo.style.textAlign = 'left';
            titulo.style.marginLeft = '10px';

            const lancamento = document.createElement("span");
            const dataCompleta = f[i].favorito[0].data;
            lancamento.textContent = dataCompleta;
            lancamento.style.color = 'black';
            lancamento.style.fontSize = '12px';
            lancamento.style.alignSelf = 'left';
            lancamento.style.textAlign = 'left';
            lancamento.style.marginLeft = '10px';
            lancamento.style.fontWeight = '500';

            div.appendChild(img);
            divTitulo.appendChild(titulo);
            divTitulo.appendChild(lancamento);
            div.appendChild(divTitulo);
            postersFilmes.appendChild(div);
        } else if(f[i].favorito[0].tipo === 'serie') {
            sT++;
            const div = document.createElement("div");
            div.style.width = '140px';
            div.style.minWidth = '140px'; 
            div.style.height = '200px';
            div.style.backgroundColor = 'white';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.textDecoration = 'none';
            div.style.transition = 'all 0.3s ease';
            div.style.position = 'relative';
            div.style.border = 'none';
            div.style.margin = '0';
            div.style.padding = '0';
            div.style.flexDirection = "column";
            div.style.marginBottom = "70px";
            div.style.border = '1px solid #e3e3e3';
            
            const img = document.createElement("img");
            img.src = f[i].favorito[0].poster;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.border = 'none';
            img.style.display = 'block';
            img.style.zIndex = '2';

            const divTitulo  = document.createElement("div");
            divTitulo.style.width = '138px';
            divTitulo.style.height = '110px';
            divTitulo.style.backgroundColor = 'transparent';
            divTitulo.style.display = 'flex';
            divTitulo.style.alignItems = 'flex-start';
            divTitulo.style.justifyContent = 'center';
            divTitulo.style.flexDirection = 'column';
            divTitulo.style.gap = '4px';
            divTitulo.style.position = 'absolute';
            divTitulo.style.bottom = '-100px';
            divTitulo.style.border = '1px solid #e3e3e3';
            divTitulo.style.borderRadius = '10px';

            const titulo = document.createElement("span");
            titulo.textContent = f[i].favorito[0].titulo;
            titulo.style.color = 'black';
            titulo.style.fontSize = '14px';
            titulo.style.fontWeight = 'bold';
            titulo.style.alignSelf = 'left';
            titulo.style.textAlign = 'left';
            titulo.style.marginLeft = '10px';

            const lancamento = document.createElement("span");
            const dataCompleta = f[i].favorito[0].data;
            lancamento.textContent = dataCompleta;
            lancamento.style.color = 'black';
            lancamento.style.fontSize = '12px';
            lancamento.style.alignSelf = 'left';
            lancamento.style.textAlign = 'left';
            lancamento.style.marginLeft = '10px';
            lancamento.style.fontWeight = '500';

            div.appendChild(img);
            divTitulo.appendChild(titulo);
            divTitulo.appendChild(lancamento);
            div.appendChild(divTitulo);
            postersSeries.appendChild(div);
        }
        }
        qtdFilmes.textContent = fT;
        qtdSeries.textContent = sT;
    }

     async function chamadaApiLista(){
        const token = localStorage.getItem("token");
        if(!token) return;

        const res = await fetch("https://api-nextpick.onrender.com/carregarLista", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        });

        const data = await res.json();

        if(data.success) {
        console.log("Carregados com sucesso");
        console.log(data);
        return data;
        } else {
        console.log(data.message);
        }
    }

    async function desenharLista() {
        const chamada = await chamadaApiLista();
        const l = chamada.lista;
        const postersFilmes = document.querySelector('.lista_filme');
        const postersSeries = document.querySelector('.lista_serie');
        const qtdFilmes = document.querySelector('.qtd_filmes_lista');
        const qtdSeries = document.querySelector('.qtd_series_lista');

        let fT = 0;
        let sT = 0;

        for(let i = 0; i < l.length; i++) {
        if(l[i].lista[0].tipo === 'filme') {
            fT++;
            const div = document.createElement("div");
            div.style.width = '140px';
            div.style.minWidth = '140px'; 
            div.style.height = '200px';
            div.style.backgroundColor = 'white';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.textDecoration = 'none';
            div.style.transition = 'all 0.3s ease';
            div.style.position = 'relative';
            div.style.border = 'none';
            div.style.margin = '0';
            div.style.padding = '0';
            div.style.flexDirection = "column";
            div.style.marginBottom = "70px";
            div.style.border = '1px solid #e3e3e3';
            
            const img = document.createElement("img");
            img.src = l[i].lista[0].poster;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.border = 'none';
            img.style.display = 'block';
            img.style.zIndex = '2';

            const divTitulo  = document.createElement("div");
            divTitulo.style.width = '138px';
            divTitulo.style.height = '110px';
            divTitulo.style.backgroundColor = 'transparent';
            divTitulo.style.display = 'flex';
            divTitulo.style.alignItems = 'flex-start';
            divTitulo.style.justifyContent = 'center';
            divTitulo.style.flexDirection = 'column';
            divTitulo.style.gap = '4px';
            divTitulo.style.position = 'absolute';
            divTitulo.style.bottom = '-100px';
            divTitulo.style.border = '1px solid #e3e3e3';
            divTitulo.style.borderRadius = '10px';

            const titulo = document.createElement("span");
            titulo.textContent = l[i].lista[0].titulo;
            titulo.style.color = 'black';
            titulo.style.fontSize = '14px';
            titulo.style.fontWeight = 'bold';
            titulo.style.alignSelf = 'left';
            titulo.style.textAlign = 'left';
            titulo.style.marginLeft = '10px';

            const lancamento = document.createElement("span");
            const dataCompleta = l[i].lista[0].data;
            lancamento.textContent = dataCompleta;
            lancamento.style.color = 'black';
            lancamento.style.fontSize = '12px';
            lancamento.style.alignSelf = 'left';
            lancamento.style.textAlign = 'left';
            lancamento.style.marginLeft = '10px';
            lancamento.style.fontWeight = '500';

            div.appendChild(img);
            divTitulo.appendChild(titulo);
            divTitulo.appendChild(lancamento);
            div.appendChild(divTitulo);
            postersFilmes.appendChild(div);
        } else if(l[i].lista[0].tipo === 'serie') {
            sT++;
            const div = document.createElement("div");
            div.style.width = '140px';
            div.style.minWidth = '140px'; 
            div.style.height = '200px';
            div.style.backgroundColor = 'white';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.textDecoration = 'none';
            div.style.transition = 'all 0.3s ease';
            div.style.position = 'relative';
            div.style.border = 'none';
            div.style.margin = '0';
            div.style.padding = '0';
            div.style.flexDirection = "column";
            div.style.marginBottom = "70px";
            div.style.border = '1px solid #e3e3e3';
            
            const img = document.createElement("img");
            img.src = l[i].lista[0].poster;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.border = 'none';
            img.style.display = 'block';
            img.style.zIndex = '2';

            const divTitulo  = document.createElement("div");
            divTitulo.style.width = '138px';
            divTitulo.style.height = '110px';
            divTitulo.style.backgroundColor = 'transparent';
            divTitulo.style.display = 'flex';
            divTitulo.style.alignItems = 'flex-start';
            divTitulo.style.justifyContent = 'center';
            divTitulo.style.flexDirection = 'column';
            divTitulo.style.gap = '4px';
            divTitulo.style.position = 'absolute';
            divTitulo.style.bottom = '-100px';
            divTitulo.style.border = '1px solid #e3e3e3';
            divTitulo.style.borderRadius = '10px';

            const titulo = document.createElement("span");
            titulo.textContent = l[i].lista[0].titulo;
            titulo.style.color = 'black';
            titulo.style.fontSize = '14px';
            titulo.style.fontWeight = 'bold';
            titulo.style.alignSelf = 'left';
            titulo.style.textAlign = 'left';
            titulo.style.marginLeft = '10px';

            const lancamento = document.createElement("span");
            const dataCompleta = l[i].lista[0].data;
            lancamento.textContent = dataCompleta;
            lancamento.style.color = 'black';
            lancamento.style.fontSize = '12px';
            lancamento.style.alignSelf = 'left';
            lancamento.style.textAlign = 'left';
            lancamento.style.marginLeft = '10px';
            lancamento.style.fontWeight = '500';

            div.appendChild(img);
            divTitulo.appendChild(titulo);
            divTitulo.appendChild(lancamento);
            div.appendChild(divTitulo);
            postersSeries.appendChild(div);
        }
        }
        qtdFilmes.textContent = fT;
        qtdSeries.textContent = sT;
    }


    document.addEventListener("DOMContentLoaded", function() {
        
    desenharFav();
    desenharLista();
    });