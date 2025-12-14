    "use strict"
   const imagens = [
    'https://media.themoviedb.org/t/p/original/jUPCUYoVdTGa5DBSxOTAriLWqmW.jpg',
    'https://media.themoviedb.org/t/p/original//5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg',
    'https://media.themoviedb.org/t/p/original//hwNtEmmugU5Yd7hpfprNWI0DGIn.jpg',
    'https://media.themoviedb.org/t/p/original//9xfDWXAUbFXQK585JvByT5pEAhe.jpg',
  ];
  let atual = 0;
  const banner = document.getElementById('bannerImg');
    if(banner) {
        setInterval(() => {
        banner.style.opacity = 0;  
        setTimeout(() => {
            atual = (atual + 1) % imagens.length;
            banner.src = imagens[atual]; 
            banner.style.opacity = 1;     
        }, 500); 
        }, 5000);
    }

    const inicioTopoBtn = document.querySelector('.inicio');
    if(inicioTopoBtn) {
        inicioTopoBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const inicio = document.querySelector('.container-fluid');
        inicio.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    function toggleMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileNav = document.getElementById('mobileNav');
        mobileMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    }

    function closeMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileNav = document.getElementById('mobileNav');
        mobileMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    async function chamadaApiFilmesPadrao() {
        let listaParams = [];
        const params = new URLSearchParams({
        "page": "1",
        "include_adult": "false",
        "language": "en-US",
        "with_release_type": "2|3",
        "with_genres": "12,28,35",
        "include_video": "false",
        "sort_by": "vote_average.desc",
        "vote_average.gte": 7.0,
        "vote_count.gte": "2000"
        }).toString();

        listaParams.push(params);
        const res = await fetch("https://api-nextpick.onrender.com/pegarFilmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ params: listaParams }),
        });
        const data = await res.json();
        return data;
    }

    async function chamadaApiSeriesPadrao() {
        const params = new URLSearchParams({
        "page": "1",
        "include_adult": "false",
        "language": "en-US",
        "with_genres": "10759,10759,10765",
        "without_keywords": "210024",
        "sort_by": "vote_average.desc",
        "vote_count.gte": "2000"
        }).toString();
        const res = await fetch("https://api-nextpick.onrender.com/pegarSeries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ params }),
        });
        const data = await res.json();
        return data;
    }

    const postersFilmesPadrao = document.querySelector('.filmes_posters');
    if(postersFilmesPadrao) {
    document.addEventListener("click", async function(e) {
        if(e.target.closest(".recomendar-filmes")) {
            const divFilmes = document.querySelector('.filmes_div');
            divFilmes.classList.remove("d-none");
            divFilmes.classList.add("d-flex"); 
            let resultado = await chamadaApiFilmesPadrao();
            let filmes = resultado.results;
            let count = 0;
            for(let i = 0; i < filmes.length; i++) {
                if(!filmes[i].poster_path) {
                    continue;
                }
                count++;
                const div = document.createElement("div");
                div.style.width = '170px';
                div.style.height = '250px';
                div.style.borderRadius = '20px';
                div.style.backgroundColor = 'black';
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
                div.style.marginBottom = "60px";

                const img = document.createElement("img");
                img.src = 'https://image.tmdb.org/t/p/w500' + filmes[i].poster_path;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '20px';
                img.style.border = 'none';
                img.style.display = 'block';

                const circle = document.createElement("div");
                circle.classList.add("circle");
                circle.style.setProperty('--rate', Math.round(filmes[i].vote_average * 10));
                const valor = Math.round(filmes[i].vote_average * 10);
                if(valor >=70) {
                    circle.style.setProperty('--cor', '#21d07a');
                } else if(valor < 70) {
                    circle.style.setProperty('--cor', '#d2d531');
                }

                const span = document.createElement("span");
                span.textContent = Math.round(filmes[i].vote_average * 10) + "%";
                span.style.color = 'white';
                span.style.fontSize = '12px';

                const divTitulo  = document.createElement("div");
                divTitulo.style.width = '170px';
                divTitulo.style.height = '150px';
                divTitulo.style.backgroundColor = 'transparent';
                divTitulo.style.display = 'flex';
                divTitulo.style.alignItems = 'flex-start';
                divTitulo.style.justifyContent = 'center';
                divTitulo.style.flexDirection = 'column';
                divTitulo.style.gap = '4px';
                divTitulo.style.position = 'absolute';
                divTitulo.style.bottom = '-130px';
                divTitulo.style.borderRadius = '20px';

                const titulo = document.createElement("span");
                titulo.textContent = filmes[i].original_title;
                titulo.style.color = 'white';
                titulo.style.fontSize = '15px';
                titulo.style.fontWeight = 'bold';
                titulo.style.alignSelf = 'left';
                titulo.style.textAlign = 'left';
                titulo.style.marginLeft = '10px';

                const lancamento = document.createElement("span");
                const dataCompleta = filmes[i].release_date;
                const partes = dataCompleta.split("-");
                const dataMes = new Date(partes[0], partes[1] - 1);
                const stringMes = dataMes.toLocaleString('default', { month: 'short'});
                const r = stringMes.replace('.', '');
                const stringData = r + ' ' + partes[2] + ', ' + partes[0];
                lancamento.textContent = stringData;
                lancamento.style.color = 'white';
                lancamento.style.fontSize = '13px';

                lancamento.style.alignSelf = 'left';
                lancamento.style.textAlign = 'left';
                lancamento.style.marginLeft = '10px';

                div.appendChild(img);
                div.appendChild(circle);
                divTitulo.appendChild(titulo);
                divTitulo.appendChild(lancamento);
                circle.appendChild(span);
                div.appendChild(divTitulo);
                postersFilmesPadrao.appendChild(div);
                
                div.addEventListener('mouseenter', () => {
                    div.style.backgroundColor = '#00000031';
                    div.style.transform = 'scale(0.95)';
                });
                div.addEventListener('mouseleave', () => {
                    div.style.backgroundColor = 'transparent';
                    div.style.transform = 'scale(1)';
                });
                }
                postersFilmesPadrao.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            });
    }

    const postersSeriesPadrao = document.querySelector('.series_posters');
    if(postersSeriesPadrao) {
        document.addEventListener("click", async function(e) {
            if(e.target.closest(".recomendar-series")) {
                const divSeries = document.querySelector('.series_div');
                divSeries.classList.remove("d-none");
                divSeries.classList.add("d-flex"); 
                let resultado = await chamadaApiSeriesPadrao();
                let series = resultado.results;
                let count = 0;
                for(let i = 0; i < series.length; i++) {
                if(!series[i].poster_path) {
                continue;
                }
                count++;
                const div = document.createElement("div");
                div.style.width = '170px';
                div.style.height = '250px';
                div.style.borderRadius = '20px';
                div.style.backgroundColor = 'black';
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
                div.style.marginBottom = "60px";

                const img = document.createElement("img");
                img.src = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + series[i].poster_path;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '20px';
                img.style.border = 'none';
                img.style.display = 'block';

                const circle = document.createElement("div");
                circle.classList.add("circle");
                circle.style.setProperty('--rate', Math.round(series[i].vote_average * 10));
                const valor = Math.round(series[i].vote_average * 10);
                if(valor >=70) {
                circle.style.setProperty('--cor', '#21d07a');
                } else if(valor < 70) {
                circle.style.setProperty('--cor', '#d2d531');
                }

                const span = document.createElement("span");
                span.textContent = Math.round(series[i].vote_average * 10) + "%";
                span.style.color = 'white';
                span.style.fontSize = '12px';

                const divTitulo  = document.createElement("div");
                divTitulo.style.width = '170px';
                divTitulo.style.height = '150px';
                divTitulo.style.backgroundColor = 'transparent';
                divTitulo.style.display = 'flex';
                divTitulo.style.alignItems = 'flex-start';
                divTitulo.style.justifyContent = 'center';
                divTitulo.style.flexDirection = 'column';
                divTitulo.style.gap = '4px';
                divTitulo.style.position = 'absolute';
                divTitulo.style.bottom = '-130px';
                divTitulo.style.borderRadius = '20px';

                const titulo = document.createElement("span");
                titulo.textContent = series[i].name;
                titulo.style.color = 'white';
                titulo.style.fontSize = '15px';
                titulo.style.fontWeight = 'bold';
                titulo.style.alignSelf = 'left';
                titulo.style.textAlign = 'left';
                titulo.style.marginLeft = '10px';

                const lancamento = document.createElement("span");
                const dataCompleta = series[i].first_air_date;
                const partes = dataCompleta.split("-");
                const dataMes = new Date(partes[0], partes[1] - 1);
                const stringMes = dataMes.toLocaleString('default', { month: 'short'});
                const r = stringMes.replace('.', '');
                const stringData = r + ' ' + partes[2] + ', ' + partes[0];
                lancamento.textContent = stringData;
                lancamento.style.color = 'white';
                lancamento.style.fontSize = '13px';
                lancamento.style.alignSelf = 'left';
                lancamento.style.textAlign = 'left';
                lancamento.style.marginLeft = '10px';

                div.appendChild(img);
                div.appendChild(circle);
                divTitulo.appendChild(titulo);
                divTitulo.appendChild(lancamento);
                circle.appendChild(span);
                div.appendChild(divTitulo);
                postersSeriesPadrao.appendChild(div);
                
                div.addEventListener('mouseenter', () => {
                div.style.backgroundColor = '#00000031';
                div.style.transform = 'scale(0.95)';
                });
                div.addEventListener('mouseleave', () => {
                div.style.backgroundColor = 'transparent';
                div.style.transform = 'scale(1)';
                });
            }
                postersSeriesPadrao.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }    