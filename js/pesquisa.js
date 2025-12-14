    "use strict"

    function removerMudanca() {
        const anterior = document.querySelector('.anteriorBtn');
        const proximo = document.querySelector('.proximoBtn');

        if (anterior) anterior.parentElement.remove();
        if (proximo) proximo.parentElement.remove();
    }

    async function criarMudanca() {
        removerMudanca();
        const container = document.querySelector('.resultado');
        const div = document.createElement("div");
        div.style.width = '100%';
        div.style.height = '100px';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.gap = '50px';

        const anterior = document.createElement("button");
        anterior.classList.add("anteriorBtn");
        anterior.style.color = '#c0c0c0ff';
        anterior.style.backgroundColor = 'transparent';
        anterior.style.width = '50px';
        anterior.style.height = '100%';
        anterior.style.border = 'none';
        anterior.textContent = 'Anterior';
        anterior.style.display = 'flex';
        anterior.style.justifyContent = 'center';
        anterior.style.alignItems = 'center';
        anterior.style.flexDirection = 'row';
        anterior.style.fontSize = '1rem';

        const anteriorI = document.createElement("i");
        anteriorI.classList.add("fa-solid", "fa-arrow-left");
        anteriorI.style.fontSize = '12px';
        anteriorI.style.marginRight = '5px';

        const proximo = document.createElement("button");
        proximo.classList.add("proximoBtn");
        proximo.style.color = '#000000ff';
        proximo.style.backgroundColor = 'transparent';
        proximo.style.width = '50px';
        proximo.style.height = '100%';
        proximo.style.border = 'none';
        proximo.textContent = 'Proximo';
        proximo.style.display = 'flex';
        proximo.style.justifyContent = 'center'; 
        proximo.style.alignItems = 'center';
        proximo.style.flexDirection = 'row';
        proximo.style.fontSize = '1rem';

        const proximoI = document.createElement("i");
        proximoI.classList.add("fa-solid", "fa-arrow-right");
        proximoI.style.fontSize = '12px';
        proximoI.style.marginLeft = '5px';

        anterior.prepend(anteriorI);
        proximo.appendChild(proximoI);
        div.appendChild(anterior);
        div.appendChild(proximo);
        container.appendChild(div);
    }

    let countFilme = 1;
    let countPessoa = 1;
    let countSerie = 1;

    let abaAtiva = "filme";

    async function verificarMudanca() {
    try {
        const botaoProximo = container.querySelector('.proximoBtn');
        const botaoAnterior = container.querySelector('.anteriorBtn');
        if (!botaoProximo) return; 

        let nextPage;
        if (abaAtiva === 'filme') nextPage = countFilme + 1;
        else if (abaAtiva === 'pessoa') nextPage = countPessoa + 1;
        else if (abaAtiva === 'serie') nextPage = countSerie + 1;

        const verificador = await chamadaApiSearch(nextPage, pesquisa);

        let resultsLength = 0;
        if (!verificador || !verificador.success) {

        botaoProximo.remove();
        return;
        }

        if(abaAtiva === 'filme' && countFilme > 1) {
            botaoAnterior.style.color = 'black';
        }
        if(abaAtiva === 'pessoa' && countPessoa > 1) {
            botaoAnterior.style.color = 'black';
        }
        if(abaAtiva === 'serie' && countSerie > 1) {
            botaoAnterior.style.color = 'black';
        }

        else if(abaAtiva === 'filme' && countFilme <= 1) {
            botaoAnterior.disabled = true;
        }
        else if(abaAtiva === 'pessoa' && countPessoa <= 1) {
            botaoAnterior.disabled = true;
        }
        else if(abaAtiva === 'serie' && countSerie <= 1) {
            botaoAnterior.disabled = true;
        }

        if (abaAtiva === 'filme') {
        resultsLength = (verificador.filme && verificador.filme.results) ? verificador.filme.results.length : 0;
        } else if (abaAtiva === 'pessoa') {
        resultsLength = (verificador.pessoa && verificador.pessoa.results) ? verificador.pessoa.results.length : 0;
        } else if (abaAtiva === 'serie') {
        resultsLength = (verificador.serie && verificador.serie.results) ? verificador.serie.results.length : 0;
        }

        if (resultsLength === 0) {
        botaoProximo.style.color = '#c0c0c0ff';
        botaoProximo.disabled = true;
        } else {
        botaoProximo.style.display = 'flex'; 
        }
    } catch (erro) {
        console.error("Erro!");
        const botaoProximo = container.querySelector('.proximoBtn');
        if (botaoProximo) {
            botaoProximo.remove();
        }
    }
    }
    
    document.addEventListener("click", async function(e) {
        if(e.target.closest(".anteriorBtn")) {
            e.preventDefault();
            if(abaAtiva === "filme" && countFilme > 1) {
                countFilme--;
                await chamadaApi("filme");
                await desenhar("filme");
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            else if(abaAtiva === "pessoa" && countPessoa > 1) {
                countPessoa--;
                await chamadaApi("pessoa");
                await desenhar("pessoa");
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            else if(abaAtiva === "serie" && countSerie > 1) {
                countSerie--;
                await chamadaApi("serie");
                await desenhar("serie");
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }

        else if(e.target.closest(".proximoBtn")) {
            e.preventDefault();
            if(abaAtiva === "filme") {
                countFilme++;
                await chamadaApi("filme");
                await desenhar("filme");
                await verificarMudanca();
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            else if(abaAtiva === "pessoa") {
                countPessoa++;
                await chamadaApi("pessoa");
                await desenhar("pessoa");
                await verificarMudanca();
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            else if(abaAtiva === "serie") {
                countSerie++;
                await chamadaApi("serie");
                await desenhar("serie");
                await verificarMudanca();
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    });

    async function chamadaApiSearch(page, pesquisa) {
        const token = localStorage.getItem("token");
        const res = await fetch("https://api-nextpick.onrender.com/search", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ page, pesquisa }),
        });

        const data = await res.json();

        if(data.success) {
        return data;
        } else {
        toastr.erro("Não foi possivel pesquisar por essa pessoa no momento.");
        }
    }

    const titlePag = document.querySelector('.title_pag');
    titlePag.textContent = localStorage.getItem("pesquisa") + ' — ' + 'NextPick';

    let pesquisa;
    let chamadaFilme;
    let chamadaPessoa;
    let chamadaSerie;
    let pessoa;
    let filme;
    let serie;
    let container;

    let filmeBtn = document.querySelector('.filme_btn');
    let pessoaBtn = document.querySelector('.pessoa_btn');
    let serieBtn = document.querySelector('.serie_btn');

    async function inicializar() {
        container = document.querySelector('.resultado');
        let page = 1;

        pesquisa = localStorage.getItem("pesquisa");
        const searchInput = document.querySelector('.search_input');
        searchInput.placeholder = pesquisa;
        chamadaFilme = await chamadaApiSearch(page, pesquisa);

        if(chamadaFilme.length <= 0) {
            document.querySelector('.anteriorBtn').remove();
            document.querySelector('.proximoBtn').remove();
        } 

        filme = chamadaFilme.filme.results;

        container.innerHTML = ' ';
        pessoaBtn.style.fontWeight = '500';
        filmeBtn.style.fontWeight = 'bold';
        serieBtn.style.fontWeight = '500';

        for(let i = 0; i < filme.length; i++) {
            const div = document.createElement("div");
            div.style.width = '75vw';
            div.style.height = '141px';
            div.style.backgroundColor = '#ffffffff';
            div.style.flexDirection = 'row';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.border = '1px solid #e3e3e3';
            div.style.borderRadius = '15px';

            const poster = document.createElement("button");
            poster.classList.add("filmesBtn");
            poster.style.margin = '0';
            poster.style.padding = '0';
            poster.style.border = 'none';
            poster.style.width = '94px';
            poster.style.minWidth = '94px';
            poster.style.height = '141px';
            poster.style.minHeight = '141px';
            poster.style.backgroundColor = '#dbdbdb';
            poster.style.display = 'flex';
            poster.style.justifyContent = 'center';
            poster.style.alignItems = 'center';
            poster.style.borderTopLeftRadius = '10px'; 
            poster.style.borderBottomLeftRadius = '10px';

            const img = document.createElement("img");
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.border = 'none';
            img.style.borderTopLeftRadius = '10px'; 
            img.style.borderBottomLeftRadius = '10px'; 
            if(filme[i].poster_path) {
                img.src = 'https://image.tmdb.org/t/p/w94_and_h141_face' + filme[i].poster_path;
                poster.dataset.poster = 'https://image.tmdb.org/t/p/original' + filme[i].poster_path;
            } else {
                img.src = "../imagens/img_desconhecido.png";
                img.style.width = 'auto';
                img.style.height = 'auto';
                poster.dataset.poster = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            }

            poster.dataset.backdrop = 'https://image.tmdb.org/t/p/original' + filme[i].backdrop_path;

            poster.dataset.genreId = filme[i].genre_ids;

            poster.dataset.id = filme[i].id;

            poster.dataset.tipo = 'filme';
                
            poster.draggable = 'false';
            img.draggable = 'false';

            const divTitulo = document.createElement("div");
            divTitulo.style.width = '100%';
            divTitulo.style.height = '100%';
            divTitulo.style.display = 'flex';
            divTitulo.style.flexDirection = 'column';
            divTitulo.style.padding = '10px 10px';

            const titulo = document.createElement("span");
            titulo.style.fontSize = '1.2rem';
            titulo.style.fontWeight = 'bold';
            titulo.style.color = 'black';
            titulo.textContent = filme[i].title;

            const lancamento = document.createElement("span");
            const dataCompleta = filme[i].release_date;
            if(!dataCompleta) lancamento.textContent = 'Indefinido';
            const partes = dataCompleta.split("-");
            const dataMes = new Date(partes[0], partes[1] - 1);
            const dataAno = partes[0];
            const stringMes = dataMes.toLocaleString('default', { month: 'short'});
            const r = stringMes.replace('.', '');
            const stringData = r + ' ' + partes[2] + ', ' + partes[0];
            if(dataCompleta) lancamento.textContent = stringData;
            lancamento.style.color = '#979797ff';
            lancamento.style.fontSize = '1.0rem';
            lancamento.style.alignSelf = 'left';
            lancamento.style.textAlign = 'left';

            poster.dataset.titulo = titulo.textContent;

            poster.dataset.dataCompleta = stringData;

            poster.dataset.dataAno = dataAno;

            const sinopse = document.createElement("span");
            sinopse.style.fontSize = '1.0em';
            sinopse.style.color = 'black';
            if(filme[i].overview.length > 255) {
                sinopse.textContent = filme[i].overview.slice(0, 255) + '...';
            } else if(filme[i].overview.length > 1 && filme[i].overview.length < 255) {
                sinopse.textContent = filme[i].overview;
            } else {
                sinopse.textContent = '...';
            }
            
            poster.appendChild(img);
            div.appendChild(poster);
            divTitulo.appendChild(titulo);
            divTitulo.appendChild(lancamento);
            divTitulo.appendChild(sinopse);
            div.appendChild(divTitulo);
            container.appendChild(div);
        
        }
    }

    inicializar();

    

    async function chamadaApi(tipo) {
        let page = 1;

        if(tipo === "filme")  page = countFilme;
        else if(tipo === "pessoa")  page = countPessoa;
        else if(tipo === "serie")  page = countSerie;
    
        pesquisa = localStorage.getItem("pesquisa");
        chamadaFilme = await chamadaApiSearch(countFilme, pesquisa);
        chamadaPessoa = await chamadaApiSearch(countPessoa, pesquisa);
        chamadaSerie = await chamadaApiSearch(countSerie, pesquisa);
        if(chamadaFilme.length <= 0) {
            document.querySelector('.anteriorBtn').remove();
            document.querySelector('.proximoBtn').remove();
        } else if(chamadaPessoa.length <= 0) {
            document.querySelector('.anteriorBtn').remove();
            document.querySelector('.proximoBtn').remove();
        } else if(chamadaSerie.length <= 0) {
            document.querySelector('.anteriorBtn').remove();
            document.querySelector('.proximoBtn').remove();
        }

        pessoa = chamadaPessoa.pessoa.results;
        filme = chamadaFilme.filme.results;
        serie = chamadaSerie.serie.results;

        criarMudanca();
        await verificarMudanca();
    }

    chamadaApi(abaAtiva);

   async function desenhar(tipo) {
        if(tipo === "filme") {
            container.innerHTML = ' ';
            pessoaBtn.style.fontWeight = '500';
            filmeBtn.style.fontWeight = 'bold';
            serieBtn.style.fontWeight = '500';
            abaAtiva = "filme";
            for(let i = 0; i < filme.length; i++) {
                const div = document.createElement("div");
                div.style.width = '75vw';
                div.style.height = '141px';
                div.style.backgroundColor = '#ffffffff';
                div.style.flexDirection = 'row';
                div.style.display = 'flex';
                div.style.alignItems = 'center';
                div.style.border = '1px solid #e3e3e3';
                div.style.borderRadius = '15px';

                const poster = document.createElement("button");
                poster.classList.add("filmesBtn");
                poster.style.margin = '0';
                poster.style.padding = '0';
                poster.style.width = '94px';
                poster.style.minWidth = '94px';
                poster.style.height = '141px';
                poster.style.minHeight = '141px';
                poster.style.backgroundColor = '#dbdbdb';
                poster.style.display = 'flex';
                poster.style.justifyContent = 'center';
                poster.style.alignItems = 'center';
                poster.style.borderTopLeftRadius = '10px'; 
                poster.style.borderBottomLeftRadius = '10px'; 

                const img = document.createElement("img");
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.border = 'none';
                img.style.borderTopLeftRadius = '10px'; 
                img.style.borderBottomLeftRadius = '10px'; 
                if(filme[i].poster_path) {
                    img.src = 'https://image.tmdb.org/t/p/w94_and_h141_face' + filme[i].poster_path;
                    poster.dataset.poster = 'https://image.tmdb.org/t/p/original' + filme[i].poster_path;
                } else {
                    img.src = "../imagens/img_desconhecido.png";
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    poster.dataset.poster = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
                }

                poster.dataset.backdrop = 'https://image.tmdb.org/t/p/original' + filme[i].backdrop_path;

                poster.dataset.genreId = filme[i].genre_ids;

                poster.dataset.id = filme[i].id;

                poster.dataset.tipo = 'filme';
                
                poster.draggable = 'false';
                img.draggable = 'false';

                const divTitulo = document.createElement("div");
                divTitulo.style.width = '100%';
                divTitulo.style.height = '100%';
                divTitulo.style.display = 'flex';
                divTitulo.style.flexDirection = 'column';
                divTitulo.style.padding = '20px';

                const titulo = document.createElement("span");
                titulo.style.fontSize = '1.2rem';
                titulo.style.fontWeight = 'bold';
                titulo.style.color = 'black';
                titulo.textContent = filme[i].title;

                const lancamento = document.createElement("span");
                const dataCompleta = filme[i].release_date;
                if(!dataCompleta) lancamento.textContent = 'Indefinido';
                const partes = dataCompleta.split("-");
                const dataMes = new Date(partes[0], partes[1] - 1);
                const dataAno = partes[0];
                const stringMes = dataMes.toLocaleString('default', { month: 'short'});
                const r = stringMes.replace('.', '');
                const stringData = r + ' ' + partes[2] + ', ' + partes[0];
                if(dataCompleta) lancamento.textContent = stringData;
                lancamento.style.color = '#979797ff';
                lancamento.style.fontSize = '1.0rem';
                lancamento.style.alignSelf = 'left';
                lancamento.style.textAlign = 'left';

                poster.dataset.titulo = titulo.textContent;

                poster.dataset.dataCompleta = stringData;

                poster.dataset.dataAno = dataAno;

                const sinopse = document.createElement("span");
                sinopse.style.fontSize = '1.0rem';
                sinopse.style.color = 'black';
                 if(serie[i].overview.length > 255) {
                    sinopse.textContent = serie[i].overview.slice(0, 255) + '...';
                } else if(serie[i].overview.length > 1 && serie[i].overview.length < 255) {
                    sinopse.textContent = serie[i].overview;
                } else {
                    sinopse.textContent = '...';
                }
                
                poster.appendChild(img);
                div.appendChild(poster);
                divTitulo.appendChild(titulo);
                divTitulo.appendChild(lancamento);
                divTitulo.appendChild(sinopse);
                div.appendChild(divTitulo);
                container.appendChild(div);
            }

            criarMudanca();
            await verificarMudanca();
        } if(tipo === "pessoa") {
            container.innerHTML = ' ';
            pessoaBtn.style.fontWeight = 'bold';
            filmeBtn.style.fontWeight = '500';
            serieBtn.style.fontWeight = '500';
            abaAtiva = "pessoa";
            for(let i = 0; i < pessoa.length; i++) {
                const div = document.createElement("div");
                div.style.width = 'auto';
                div.style.height = '75px';
                div.style.backgroundColor = '#ffffffff';
                div.style.flexDirection = 'row';
                div.style.display = 'flex';
                div.style.borderRadius = '12px';
                div.style.alignItems = 'center';
                div.style.gap = '20px';

                const poster = document.createElement("div");
                poster.style.width = '75px';
                poster.style.height = '75px';
                poster.style.borderRadius = '15px';
                poster.style.backgroundColor = '#dbdbdb';
                poster.style.display = 'flex';
                poster.style.justifyContent = 'center';
                poster.style.alignItems = 'center';

                const img = document.createElement("img");
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.borderRadius = '20px';
                img.style.border = 'none';
                if(pessoa[i].profile_path) {
                    img.src = 'https://image.tmdb.org/t/p/w90_and_h90_face' + pessoa[i].profile_path;
                } else {
                    img.src = "../imagens/desconhecido.png";
                    img.style.width = '50%';
                    img.style.height = '50%';
                }
                
                poster.draggable = 'false';
                img.draggable = 'false';

                const divNome = document.createElement("div");
                divNome.style.width = 'auto';
                divNome.style.height = 'auto';
                divNome.style.display = 'flex';
                divNome.style.flexDirection = 'column';

                const nome = document.createElement("span");
                nome.style.fontSize = '18px';
                nome.style.fontWeight = 'bold';
                nome.style.color = 'black';
                nome.textContent = pessoa[i].name;

                const departamento = document.createElement("span");
                departamento.style.fontSize = '14px';
                departamento.style.color = 'black';
                let obras = [];

                for (let j = 0; j < pessoa[i].known_for.length; j++) {
                    const obra = pessoa[i].known_for[j];
                    const titulo = obra.title || obra.name; 
                    if (titulo) obras.push(titulo);
                }

                departamento.textContent = pessoa[i].known_for_department + ' • ' + obras.join(", ");
                
                poster.appendChild(img);
                div.appendChild(poster);
                divNome.appendChild(nome);
                divNome.appendChild(departamento);
                div.appendChild(divNome);
                container.appendChild(div);
            }

            criarMudanca();
            await verificarMudanca();
        } if(tipo === "serie") {
            container.innerHTML = ' ';
            pessoaBtn.style.fontWeight = '500';
            filmeBtn.style.fontWeight = '500';
            serieBtn.style.fontWeight = 'bold';
            abaAtiva = "serie";
            for(let i = 0; i < serie.length; i++) {
                const div = document.createElement("div");
                div.style.width = '75vw';
                div.style.height = '141px';
                div.style.backgroundColor = '#ffffffff';
                div.style.flexDirection = 'row';
                div.style.display = 'flex';
                div.style.alignItems = 'center';
                div.style.border = '1px solid #e3e3e3';
                div.style.borderRadius = '15px';

                const poster = document.createElement("button");
                poster.classList.add("seriesBtn");
                poster.style.margin = '0';
                poster.style.padding = '0';
                poster.style.width = '94px';
                poster.style.minWidth = '94px';
                poster.style.height = '141px';
                poster.style.minHeight = '141px';
                poster.style.backgroundColor = '#dbdbdb';
                poster.style.display = 'flex';
                poster.style.justifyContent = 'center';
                poster.style.alignItems = 'center';
                poster.style.borderTopLeftRadius = '10px'; 
                poster.style.borderBottomLeftRadius = '10px'; 
                poster.style.border = '1px solid #e3e3e3';

                const img = document.createElement("img");
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.border = 'none';
                img.style.borderTopLeftRadius = '10px'; 
                img.style.borderBottomLeftRadius = '10px'; 
                if(serie[i].poster_path) {
                    img.src = 'https://image.tmdb.org/t/p/w94_and_h141_face' + serie[i].poster_path;
                    poster.dataset.poster = 'https://image.tmdb.org/t/p/original' + serie[i].poster_path;
                } else {
                    img.src = "../imagens/img_desconhecido.png";
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    poster.dataset.poster = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
                }

                poster.dataset.backdrop = 'https://image.tmdb.org/t/p/original' + serie[i].backdrop_path;

                poster.dataset.genreId = serie[i].genre_ids;

                poster.dataset.id = serie[i].id;

                poster.dataset.tipo = 'serie';
                
                poster.draggable = 'false';
                img.draggable = 'false';

                const divTitulo = document.createElement("div");
                divTitulo.style.width = '100%';
                divTitulo.style.height = '100%';
                divTitulo.style.display = 'flex';
                divTitulo.style.flexDirection = 'column';
                divTitulo.style.padding = '20px';

                const titulo = document.createElement("span");
                titulo.style.fontSize = '1.2rem';
                titulo.style.fontWeight = 'bold';
                titulo.style.color = 'black';
                titulo.textContent = serie[i].name;

                const lancamento = document.createElement("span");
                const dataCompleta = serie[i].first_air_date;
                if(!dataCompleta) lancamento.textContent = 'Indefinido';
                const partes = dataCompleta.split("-");
                const dataMes = new Date(partes[0], partes[1] - 1);
                const dataAno = partes[0];
                const stringMes = dataMes.toLocaleString('default', { month: 'short'});
                const r = stringMes.replace('.', '');
                const stringData = r + ' ' + partes[2] + ', ' + partes[0];
                if(dataCompleta) lancamento.textContent = stringData;
                lancamento.style.color = '#979797ff';
                lancamento.style.fontSize = '1.0rem';
                lancamento.style.alignSelf = 'left';
                lancamento.style.textAlign = 'left';

                poster.dataset.titulo = titulo.textContent;

                poster.dataset.dataCompleta = stringData;

                poster.dataset.dataAno = dataAno;

                const sinopse = document.createElement("span");
                sinopse.style.fontSize = '1.0rem';
                sinopse.style.color = 'black';
                sinopse.style.fontSize = '1.0em';
                sinopse.style.color = 'black';
                if(serie[i].overview.length > 255) {
                    sinopse.textContent = serie[i].overview.slice(0, 255) + '...';
                } else if(serie[i].overview.length > 1 && serie[i].overview.length < 255) {
                    sinopse.textContent = serie[i].overview;
                } else {
                    sinopse.textContent = '...';
                }
                
                poster.appendChild(img);
                div.appendChild(poster);
                divTitulo.appendChild(titulo);
                divTitulo.appendChild(lancamento);
                divTitulo.appendChild(sinopse);
                div.appendChild(divTitulo);
                container.appendChild(div);
            }

            criarMudanca();
            await verificarMudanca();
        }
    }

    document.addEventListener("click", async function(e) {
        if(e.target.closest(".filme_btn")) {
            desenhar("filme");
        } else if(e.target.closest(".pessoa_btn")) {
            desenhar("pessoa");
        } else if(e.target.closest(".serie_btn")) {
            desenhar("serie");
        }
    });
        
    document.addEventListener("DOMContentLoaded", function(event) {
        event.preventDefault();
    });

        
    

   

