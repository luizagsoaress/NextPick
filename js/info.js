'use strict'

    async function desenharInfo(tipo) {
        const posterPath = document.querySelector('.poster_path');
        const posterCaminho = localStorage.getItem("posterPath");
        if(posterCaminho === 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg') {
            posterPath.style.width = '300px';
            posterPath.style.height = '450px';
        }
        if (posterPath) {
        posterPath.src = posterCaminho;
        }
        
        const infoDiv = document.querySelector('.info-div');
        const backgroundCaminho = localStorage.getItem("bgPath");
        infoDiv.style.backgroundImage = `url(${backgroundCaminho})`;

        const titulo = document.querySelector('.titulo');
        const title = localStorage.getItem("titulo");
        titulo.textContent = title;
        let t;
        if(tipo === "serie") {
            t = '(Série)';
        } else if(tipo === "filme") {
            t = '(Filme)';
        }
        const tituloPag = document.querySelector('.titulo_pag');
        tituloPag.textContent = title + ' ' +  t;
        
        const ano = document.querySelector('.ano');
        const dataAno = localStorage.getItem("dataAno");
        ano.textContent = '(' + dataAno + ')';

        const tituloVideo = document.querySelector('.tituloVideo');
        tituloVideo.textContent = title + ' | ' + 'Trailer Oficial' + ' | ' + ano.textContent;

        if(tipo === 'filme') {
            const classificacao = document.querySelector('.classificacao');
            const idade = localStorage.getItem("classificacao");
            classificacao.textContent = idade;

            const duracao = document.querySelector('.duracao');
            const tempo = localStorage.getItem("duracao");
            duracao.textContent = tempo + 'm';
        } else if(tipo === 'serie') {
            const classificacao = document.querySelector('.classificacao');
            const duracao = document.querySelector('.duracao');
            const ponto = document.querySelector('.ponto');

            classificacao.remove();
            duracao.remove();
            ponto.remove();
        }
        

        const data = document.querySelector('.data');
        const dataCompleta = localStorage.getItem("data");
        data.textContent = dataCompleta;

        const genero = document.querySelector('.genero');
        const nomeGenero = localStorage.getItem("nomeGenero");
        genero.textContent = nomeGenero;

        const texto = document.querySelector('.texto');
        const overview = localStorage.getItem("overview");
        texto.textContent = overview;
        

        const diretor = document.querySelector('.diretor');
        const diretorNome = localStorage.getItem("diretorNome");
        diretor.textContent = diretorNome;

        const diretorFuncoes = document.querySelector('.funcoes');
        const arrayFuncoes = localStorage.getItem("diretorFuncao");
        diretorFuncoes.textContent = arrayFuncoes;

        const OC = document.querySelector('.OC');
        const originCountry = localStorage.getItem("originCountry");
        OC.textContent = '\t' + originCountry;

        const score = document.querySelector('.score');
        const avaliacao = localStorage.getItem("avaliacao");
        score.textContent = avaliacao;
        const circle = document.querySelector('.circle');
        const valor = parseInt(avaliacao);

        if(valor >=70) {
            circle.style.setProperty('--cor', '#21d07a');
        } else if(valor < 70) {
            circle.style.setProperty('--cor', '#d2d531');
        }

        const streamingImg = document.querySelector('.streaming-img');
        const streaming = JSON.parse(localStorage.getItem("streaming"));
        streamingImg.src = 'https://image.tmdb.org/t/p/w92' + streaming.logo_path;

        const status = document.querySelector('.status');
        const estado = localStorage.getItem("status");
        status.textContent = estado;

        const originalLanguage = document.querySelector('.originalLanguage');
        const original = localStorage.getItem("originalLanguage");
        originalLanguage.textContent = original;

        const tagline = document.querySelector('.tagline');
        const tag = localStorage.getItem("tagline");
        tagline.textContent = tag;

        const produtoras = document.querySelector('.produtoras');
        const production = JSON.parse(localStorage.getItem("produtoras"));
        
        for(let i = 0; i < production.length; i++) {
            const span = document.createElement("span");
            span.style.color = 'black';
            span.style.fontSize = '14px';
            span.textContent = production[i].name;

            produtoras.appendChild(span);
        }
        
    }

    

    const trailer = document.querySelector('.trailer');
    const keys = localStorage.getItem("key").split(",");
    const key = keys[0];
    if(key) {
        const divVideos = document.querySelector('.videos');
        divVideos.classList.remove("d-none");
        divVideos.classList.add("d-flex");
    }

    const thumbnail = `https://img.youtube.com/vi/${key}/maxresdefault.jpg`;
    const imgT = document.querySelector('.thumbnail');
    imgT.src = thumbnail;
    
    function on() {
        document.getElementById("overlay").style.display = "flex";
        const popup = document.getElementById("popup").style.display = "flex";
        const urlVideo = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1`;
        const videoPopup = document.getElementById("video-popup");
        videoPopup.src = urlVideo;
        
    }

    function fechar() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("popup").style.display = "none";
    } 

    trailer.addEventListener("click", function(event) {
        event.preventDefault();
        on();
    });

    async function chamadaApiElenco(tipo, id) {
        let res;
        if(tipo === "tv") {
            res = await fetch("https://api-nextpick.onrender.com/creditosSerie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify ({ tipo, id })
        });
        } else if(tipo === "movie") {
            res = await fetch("https://api-nextpick.onrender.com/creditosFilme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify ({ tipo, id })
        });
        }

        const data = await res.json();
        return data;
    }
    
    async function desenharElenco() {
        const id = localStorage.getItem("id");
        const sF = localStorage.getItem("tipo");
        let tipo;
        if(sF === 'filme') {
            tipo = 'movie';
        } else if(sF === 'serie') {
            tipo = 'tv';
        }
        const chamada = await chamadaApiElenco(tipo, id);
        console.log(chamada);
        const info = chamada.data;
        const elenco = info.cast;

        const postersElenco = document.querySelector('.elenco-div');
        const castDiv = document.querySelector('.cast');
        const elencoh4 = document.querySelector('.elencoh4');
        const videos = document.querySelector('.videos');
        videos.style.marginTop = '10vh';

        if (!elenco || elenco.length === 0) {
            castDiv.appendChild(videos);
            postersElenco.remove();
            elencoh4.remove();
            return;
        }

        for(let i = 0; i < elenco.length; i++) {

        const div = document.createElement("div");
        div.style.width = '147px';
        div.style.minWidth = '147px'; 
        div.style.height = '200px';
        div.classList.add("filmesBtn");
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
        if(!elenco[i].profile_path) {
            img.src = "../imagens/desconhecido.png";
            img.style.width = '50%';
            img.style.height = '35%';
        }else {
            img.src = 'https://image.tmdb.org/t/p/original' + elenco[i].profile_path;
            img.style.width = '100%';
            img.style.height = '100%';
        }
        img.style.objectFit = 'cover';
        img.style.border = 'none';
        img.style.display = 'block';
        img.style.zIndex = '2';

        const divTitulo  = document.createElement("div");
        divTitulo.style.width = '145px';
        divTitulo.style.height = '140px';
        divTitulo.style.backgroundColor = 'transparent';
        divTitulo.style.display = 'flex';
        divTitulo.style.alignItems = 'flex-start';
        divTitulo.style.justifyContent = 'center';
        divTitulo.style.flexDirection = 'column';
        divTitulo.style.gap = '4px';
        divTitulo.style.position = 'absolute';
        divTitulo.style.bottom = '-120px';
        divTitulo.style.border = '1px solid #e3e3e3';
        divTitulo.style.borderRadius = '10px';

        const titulo = document.createElement("span");
        titulo.textContent = elenco[i].name;
        titulo.style.color = 'black';
        titulo.style.fontSize = '14px';
        titulo.style.fontWeight = 'bold';
        titulo.style.alignSelf = 'left';
        titulo.style.textAlign = 'left';
        titulo.style.marginLeft = '10px';
        titulo.classList.add("nomes");

        const funcao = document.createElement("span"); 
        if (sF === "serie") {
            funcao.textContent = elenco[i].roles?.[0]?.character || "—";
        } else if (sF === "filme") {
            funcao.textContent = elenco[i].character || "—";
        }
        funcao.style.color = 'black';
        funcao.style.fontSize = '13px';
        funcao.style.alignSelf = 'left';
        funcao.style.textAlign = 'left';
        funcao.style.marginLeft = '10px';
        funcao.classList.add("funcao");

        div.appendChild(img);
        divTitulo.appendChild(titulo);
        divTitulo.appendChild(funcao);
        div.appendChild(divTitulo);
        postersElenco.appendChild(div);

        }
    }
    
    const tipoFs = localStorage.getItem("tipo");

    if(tipoFs === 'filme') {
        desenharInfo('filme');
    } else if(tipoFs === 'serie') {
        desenharInfo('serie');
    }

    
    desenharElenco();