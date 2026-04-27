'use strict'

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

async function chamadaApiFilmes(idGenero,  classificacao, tempoMin, tempoMax, inicial, final) {
    let listaParams = [];
    for(let page = 1; page < 5; page++) {
      const params = new URLSearchParams({
      "page": page,
      "include_adult": "false",
      "primary_release_date.gte": inicial ,
      "primary_release_date.lte": final ,
      "with_release_type": "2|3",
      "include_video": "true",
      "with_genres": idGenero,
      "with_runtime.gte": tempoMin,
      "with_runtime.lte": tempoMax,
      "certification_country": "US",
      "certification": classificacao,
      "sort_by": "vote_average.desc",
      "vote_count.gte": "1000",
      "vote_average.gte": 6.0,
      "without_keywords": "210024",
      }).toString();

      listaParams.push(params);
    }
   
    const res = await fetch("https://api-nextpick.onrender.com/pegarFilmes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ params: listaParams }),
    });
    const data = await res.json();

    return data;
}

async function chamadaApiSeries(idGenero, inicial, final) {
    const params = new URLSearchParams({
      "page": "1",
      "include_adult": "false",
      "language": "en-US",
      "first_air_date.gte": inicial,
      "first_air_date.lte": final,
      "with_genres": idGenero,
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

async function desenharFilmes(idGenero, idadeMin, tempoMin, tempoMax, inicial, final) {
    const postersFilmes = document.querySelector('.filmes_posters');
    const divFilmes = document.querySelector('.filmes_div');
    divFilmes.classList.remove("d-none");
    divFilmes.classList.add("d-flex");
    postersFilmes.innerHTML = ''; 
    let resultado = await chamadaApiFilmes(idGenero, idadeMin, tempoMin, tempoMax, inicial, final);
    let filmes = resultado.results;
    if(filmes.length === 0) {
      resultado = await chamadaApiFilmesPadrao();
      filmes = resultado.results;
      toastr.erro("Não foi possivel encontrar boas recomendações baseadas nos filtros atuais. Vamos mostrar filmes populares por padrão.");
    }
    let count = 0;
    for(let i = 0; i < filmes.length; i++) {
      if(!filmes[i].poster_path) {
        continue;
      }
      count++;
      const button = document.createElement("button");
      button.style.width = '150px';
      button.style.minWidth = '150px'; 
      button.style.height = '225px';
      button.style.minHeight = '225px';
      button.classList.add("filmesBtn");
      button.style.borderRadius = '15px';
      button.style.backgroundColor = 'black';
      button.style.display = 'flex';
      button.style.justifyContent = 'center';
      button.style.alignItems = 'center';
      button.style.textDecoration = 'none';
      button.style.transition = 'all 0.3s ease';
      button.style.position = 'relative';
      button.style.border = 'none';
      button.style.margin = '0';
      button.style.padding = '0';
      button.style.flexDirection = "column";
      button.style.marginBottom = "90px";

      const img = document.createElement("img");
      img.src = 'https://image.tmdb.org/t/p/w500' + filmes[i].poster_path;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '15px';
      img.style.border = 'none';
      img.style.display = 'block';

      button.dataset.poster = 'https://image.tmdb.org/t/p/original' + filmes[i].poster_path;

      button.dataset.backdrop = 'https://image.tmdb.org/t/p/original' + filmes[i].backdrop_path;

      button.dataset.genreId = filmes[i].genre_ids;

      button.dataset.id = filmes[i].id;

      button.dataset.tipo = 'filme';

      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.setProperty('--rate', Math.round(filmes[i].vote_average * 10));
      const valor = Math.round(filmes[i].vote_average * 10);
      if(valor >=70) {
        circle.style.setProperty('--cor', '#21d07a');
      } else if(valor < 70) {
        circle.style.setProperty('--cor', '#d2d531');
      } else if(valor < 50) {
        circle.style.setProperty('--cor', '#ff0000ff');
      }

      button.dataset.rate = valor;

      const span = document.createElement("span");
      span.textContent = Math.round(filmes[i].vote_average * 10) + "%";
      span.style.color = 'white';
      span.style.fontSize = '12px';

      const pontos = document.createElement("button");
      pontos.classList.add("fa-solid", "fa-ellipsis");
      pontos.style.borderRadius = '50%';
      pontos.style.backgroundColor = '#eeeeee';
      pontos.style.border = 'none';
      pontos.style.width = '23px';
      pontos.style.height = '23px';
      pontos.style.display = 'flex';
      pontos.style.justifyContent = 'center';
      pontos.style.alignItems = 'center';
      pontos.style.fontSize = '18px';
      pontos.setAttribute('data-bs-toggle', 'dropdown');

      const container = document.createElement("li");
      container.classList.add("dropdown");
      container.style.display = 'flex';
      container.style.right = '8px';
      container.style.justifyContent = 'center';
      container.style.alignItems = 'center';
      container.style.position = 'absolute';
      container.style.top = '+15px';
      
      const ul = document.createElement("ul");
      ul.classList.add("dropdown-menu");
      ul.classList.add("opcoes_menu");
      ul.style.height = '100px';

      const li = document.createElement("li");
      li.classList.add("addLi");
      li.style.display = 'flex';
      li.style.justifyContent = 'center';
      li.style.alignItems = 'center';
      li.style.flexDirection = 'column';
      li.style.height = '100%';
      li.style.width = '100%';

      const coracao = document.createElement("i");
      coracao.classList.add("fa-solid", "fa-heart");
      coracao.style.fontSize = '12px';       
      coracao.style.alignSelf = 'center';
      coracao.style.marginRight = '10px';

      const marcador = document.createElement("i");
      marcador.classList.add("fa-solid", "fa-bookmark");
      marcador.style.fontSize = '12px';       
      marcador.style.alignSelf = 'center';
      marcador.style.marginRight = '10px';

      const btnFav = document.createElement("button");
      btnFav.classList.add("btnFav");
      btnFav.textContent = 'Add favoritos';
      btnFav.style.fontSize = '14px';
      btnFav.style.fontWeight = 'bold';
      btnFav.classList.add("dropdown-item");
      btnFav.style.width = '100%';
      btnFav.style.height = '50%';
      btnFav.style.borderBottom = '1px solid rgb(230, 230, 230)';
      btnFav.prepend(coracao);

      const btnWat = document.createElement("button");
      btnWat.textContent = 'Add lista';
      btnWat.classList.add("btnWat");
      btnWat.style.fontSize = '14px';
      btnWat.style.fontWeight = 'bold';
      btnWat.classList.add("dropdown-item");
      btnWat.style.width = '100%';
      btnWat.style.height = '50%';
      btnWat.prepend(marcador);
      
      ul.appendChild(li);
      li.appendChild(btnFav);
      li.appendChild(btnWat);
      container.appendChild(pontos);
      container.appendChild(ul);

      new bootstrap.Dropdown(pontos);

      const divTitulo  = document.createElement("div");
      divTitulo.style.width = '170px';
      divTitulo.style.height = '120px';
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
      titulo.textContent = filmes[i].title;
      titulo.style.color = 'black';
      titulo.style.fontSize = '15px';
      titulo.style.fontWeight = 'bold';
      titulo.style.alignSelf = 'left';
      titulo.style.textAlign = 'left';
      titulo.style.marginLeft = '10px';

      const lancamento = document.createElement("span");
      const dataCompleta = filmes[i].release_date;
      const partes = dataCompleta.split("-");
      const dataMes = new Date(partes[0], partes[1] - 1);
      const dataAno = partes[0];
      const stringMes = dataMes.toLocaleString('default', { month: 'short'});
      const r = stringMes.replace('.', '');
      const stringData = r + ' ' + partes[2] + ', ' + partes[0];
      lancamento.textContent = stringData;
      lancamento.style.color = 'black';
      lancamento.style.fontSize = '14px';
      lancamento.style.alignSelf = 'left';
      lancamento.style.textAlign = 'left';
      lancamento.style.marginLeft = '10px';
      lancamento.classList.add("dataCompleta");

      button.dataset.titulo = titulo.textContent;

      button.dataset.dataCompleta = stringData;

      button.dataset.dataAno = dataAno;

      button.appendChild(img);
      button.appendChild(circle);
      button.appendChild(container);
      divTitulo.appendChild(titulo);
      divTitulo.appendChild(lancamento);
      circle.appendChild(span);
      button.appendChild(divTitulo);
      postersFilmes.appendChild(button);

      button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#00000031';
        button.style.transform = 'scale(0.95)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'transparent';
        button.style.transform = 'scale(1)';
      });

      pontos.addEventListener('mouseenter', () => {
        pontos.style.backgroundColor = '#00a2ffff';
      });
      pontos.addEventListener('mouseleave', () => {
        pontos.style.backgroundColor = '#eeeeee';
        pontos.style.transform = 'scale(1)';
      });

      btnFav.addEventListener('mouseenter', () => {
        btnFav.style.backgroundColor = '#032541';
        btnFav.style.color = '#fff';
      });
      btnFav.addEventListener('mouseleave', () => {
        btnFav.style.backgroundColor = '#ffffffff';
        btnFav.style.transform = 'scale(1)';
        btnFav.style.color = 'black';
      });

      btnWat.addEventListener('mouseenter', () => {
        btnWat.style.backgroundColor = '#032541';
        btnWat.style.color = '#fff';
      });
      btnWat.addEventListener('mouseleave', () => {
        btnWat.style.backgroundColor = '#ffffffff';
        btnWat.style.transform = 'scale(1)';
        btnWat.style.color = 'black';
      });
  }
  postersFilmes.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function desenharSeries(idGenero, classificacao, inicial, final) {
    const postersSeries = document.querySelector('.series_posters');
    const divSeries = document.querySelector('.series_div');
    divSeries.classList.remove("d-none");
    divSeries.classList.add("d-flex");
    postersSeries.innerHTML = ''; 
    let resultado = await chamadaApiSeries(idGenero, classificacao, inicial, final);
    let series = resultado.results;
    if(series.length === 0) {
      resultado = await chamadaApiSeriesPadrao();
      series = resultado.results;
      toastr.erro("Não foi possivel encontrar boas recomendações baseadas nos filtros atuais. Vamos mostrar series populares por padrão.");
    }
    let count = 0;
    for(let i = 0; i < series.length; i++) {
      if(!series[i].poster_path) {
        continue;
      }
      count++;
      const button = document.createElement("button");
      button.style.width = '150px';
      button.style.minWidth = '150px'; 
      button.style.height = '225px';
      button.style.minHeight = '225px';
      button.classList.add("seriesBtn");
      button.style.borderRadius = '15px';
      button.style.backgroundColor = 'black';
      button.style.display = 'flex';
      button.style.justifyContent = 'center';
      button.style.alignItems = 'center';
      button.style.textDecoration = 'none';
      button.style.transition = 'all 0.3s ease';
      button.style.position = 'relative';
      button.style.border = 'none';
      button.style.margin = '0';
      button.style.padding = '0';
      button.style.flexDirection = "column";
      button.style.marginBottom = "90px";

      const img = document.createElement("img");
      img.src = 'https://media.themoviedb.org/t/p/original' + series[i].poster_path;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '15px';
      img.style.border = 'none';
      img.style.display = 'block';

      button.dataset.poster = 'https://image.tmdb.org/t/p/original' + series[i].poster_path;

      button.dataset.backdrop = 'https://image.tmdb.org/t/p/original' + series[i].backdrop_path;

      button.dataset.genreId = series[i].genre_ids;

      button.dataset.id = series[i].id;

      button.dataset.tipo = 'serie';

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

      const pontos = document.createElement("button");
      pontos.classList.add("fa-solid", "fa-ellipsis");
      pontos.style.borderRadius = '50%';
      pontos.style.backgroundColor = '#eeeeee';
      pontos.style.border = 'none';
      pontos.style.width = '23px';
      pontos.style.height = '23px';
      pontos.style.display = 'flex';
      pontos.style.justifyContent = 'center';
      pontos.style.alignItems = 'center';
      pontos.style.fontSize = '18px';
      pontos.setAttribute('data-bs-toggle', 'dropdown');

      const container = document.createElement("li");
      container.classList.add("dropdown");
      container.style.display = 'flex';
      container.style.right = '8px';
      container.style.justifyContent = 'center';
      container.style.alignItems = 'center';
      container.style.position = 'absolute';
      container.style.top = '+15px';
      
      const ul = document.createElement("ul");
      ul.classList.add("dropdown-menu");
      ul.classList.add("opcoes_menu");
      ul.style.height = '100px';

      const li = document.createElement("li");
      li.style.display = 'flex';
      li.style.justifyContent = 'center';
      li.style.alignItems = 'center';
      li.style.flexDirection = 'column';
      li.style.height = '100%';

      const coracao = document.createElement("i");
      coracao.classList.add("fa-solid", "fa-heart");
      coracao.style.fontSize = '12px';       
      coracao.style.alignSelf = 'center';
      coracao.style.marginRight = '10px';

      const marcador = document.createElement("i");
      marcador.classList.add("fa-solid", "fa-bookmark");
      marcador.style.fontSize = '12px';       
      marcador.style.alignSelf = 'center';
      marcador.style.marginRight = '10px';

      const btnFav = document.createElement("button");
      btnFav.classList.add("btnFav");
      btnFav.textContent = 'Add favoritos';
      btnFav.style.fontSize = '14px';
      btnFav.style.fontWeight = 'bold';
      btnFav.classList.add("dropdown-item");
      btnFav.style.width = '100%';
      btnFav.style.height = '50%';
      btnFav.style.borderBottom = '1px solid rgb(230, 230, 230)';
      btnFav.prepend(coracao);

      const btnWat = document.createElement("button");
      btnWat.classList.add("btnWat");
      btnWat.textContent = 'Add lista';
      btnWat.style.fontSize = '14px';
      btnWat.style.fontWeight = 'bold';
      btnWat.classList.add("dropdown-item");
      btnWat.style.width = '100%';
      btnWat.style.height = '50%';
      btnWat.prepend(marcador);
      
      ul.appendChild(li);
      li.appendChild(btnFav);
      li.appendChild(btnWat);
      container.appendChild(pontos);
      container.appendChild(ul);

      new bootstrap.Dropdown(pontos);

      const divTitulo  = document.createElement("div");
      divTitulo.style.width = '170px';
      divTitulo.style.height = '120px';
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
      titulo.style.color = 'black';
      titulo.style.fontSize = '15px';
      titulo.style.fontWeight = 'bold';
      titulo.style.alignSelf = 'left';
      titulo.style.textAlign = 'left';
      titulo.style.marginLeft = '10px';

      const lancamento = document.createElement("span");
      const dataCompleta = series[i].first_air_date;
      const partes = dataCompleta.split("-");
      const dataMes = new Date(partes[0], partes[1] - 1);
      const dataAno = partes[0];
      const stringMes = dataMes.toLocaleString('default', { month: 'short'});
      const r = stringMes.replace('.', '');
      const stringData = r + ' ' + partes[2] + ', ' + partes[0];
      lancamento.textContent = stringData;
      lancamento.style.color = 'black';
      lancamento.style.fontSize = '14px';
      lancamento.style.alignSelf = 'left';
      lancamento.style.textAlign = 'left';
      lancamento.style.marginLeft = '10px';

      button.dataset.titulo = titulo.textContent;

      button.dataset.dataCompleta = stringData;

      button.dataset.dataAno = dataAno;

      button.appendChild(img);
      button.appendChild(circle);
      button.appendChild(container);
      divTitulo.appendChild(titulo);
      divTitulo.appendChild(lancamento);
      circle.appendChild(span);
      button.appendChild(divTitulo);
      postersSeries.appendChild(button);

      button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#00000031';
        button.style.transform = 'scale(0.95)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'transparent';
        button.style.transform = 'scale(1)';
      });

      pontos.addEventListener('mouseenter', () => {
        pontos.style.backgroundColor = '#00a2ffff';
      });
      pontos.addEventListener('mouseleave', () => {
        pontos.style.backgroundColor = '#eeeeee';
        pontos.style.transform = 'scale(1)';
      });

      btnFav.addEventListener('mouseenter', () => {
        btnFav.style.backgroundColor = '#032541';
        btnFav.style.color = '#fff';
      });
      btnFav.addEventListener('mouseleave', () => {
        btnFav.style.backgroundColor = '#ffffffff';
        btnFav.style.transform = 'scale(1)';
        btnFav.style.color = 'black';
      });

      btnWat.addEventListener('mouseenter', () => {
        btnWat.style.backgroundColor = '#032541';
        btnWat.style.color = '#fff';
      });
      btnWat.addEventListener('mouseleave', () => {
        btnWat.style.backgroundColor = '#ffffffff';
        btnWat.style.transform = 'scale(1)';
        btnWat.style.color = 'black';
      });
  }
  postersSeries.scrollIntoView({ behavior: "smooth", block: "start" });
}

function limparSelect() {
    const select = document.querySelectorAll('select');
    select.forEach(s => {
      s.value = "";
    });
}

const confirmarPerguntas = document.querySelector(".confirmarPerguntas");
  if(confirmarPerguntas) {
    confirmarPerguntas.addEventListener("click", async function(event) {
    event.preventDefault();
    const tipo = document.getElementById("tipo");
    const genero = document.getElementById("genero").value;
    const duracao = document.getElementById("duracao");
    const classificacao = document.getElementById("classificacao");
    const ano = document.getElementById("ano");
    if(tipo.value === "filme") {
      if(!genero || !duracao.value || !classificacao.value || !ano.value) {
      toastr.erro("Preencha todos os valores.");
      return;
    }
    } else if(tipo.value === "serie") {
      if(!genero || !ano.value) {
      toastr.erro("Preencha todos os valores.");
      return;
    }
    }
    
    let inicial;
    let final;
    let idGenero;
    let tempoMin;
    let tempoMax;
    let idadeMin;
    let idadeNum;

    const anoAtual = new Date().getFullYear();
    if(ano.value === "recentes") {
      inicial = "2020-01-01";
      final = `${anoAtual}-12-31`;
    } else if(ano.value === "2010s") {
      inicial = "2010-01-01";
      final = "2019-12-31";
    } else if(ano.value === "2000s") {
      inicial = "2000-01-01";
      final = "2009-12-31";
    } else if(ano.value === "antigos") {
      inicial = "1900-01-01";
      final = "1999-12-31";
    }
    
    if(tipo.value === "filme") {

    if(classificacao.value === "livre") {
      idadeMin = "G";
    } else if(classificacao.value === "10") {
      idadeMin = "PG";
    } else if(classificacao.value === "12") {
      idadeMin = "PG-13";
    } else if(classificacao.value === "14") {
      idadeMin = "PG-13";
    } else if(classificacao.value === "16") {
      idadeMin = "R";
    } 
    switch (genero) {
      case "acao":
        idGenero = "28";
        break;
      case "aventura":
        idGenero = "12";
        break;
      case "comedia":
        idGenero = "35";
        break;
      case "crime":
        idGenero = "80";
        break;
      case "drama":
        idGenero = "18";
        break;
      case "documentario":
        idGenero = "99";
        break;
      case "fantasia":
        idGenero = "14";
        break;
      case "terror":
        idGenero = "27";
        break;
      case "ficcaoCientifica":
        idGenero = "878";
        break;
      case "romance":
        idGenero = "10749";
        break;
      case "suspense":
        idGenero = "53";
        break;
      default:
        break;
    }

    if(duracao.value === "130") {
      tempoMin = 0;
      tempoMax = 90;
    }else if(duracao.value === "1302") {
      tempoMin = 90;
      tempoMax = 120;
    } else if(duracao.value === "m2") {
      tempoMin = 120;
    }

    await desenharFilmes(idGenero, idadeMin, tempoMin, tempoMax, inicial, final);
    localStorage.setItem("classificacao", classificacao.value);
    limparSelect();
    } else if(tipo.value === "serie") {
      switch (genero) {
        case "acao":
          idGenero = "10759";
          break;
        case "aventura":
          idGenero = "10759";
          break;
        case "comedia":
          idGenero = "35";
          break;
        case "crime":
          idGenero = "80";
          break;
        case "drama":
          idGenero = "18";
          break;
        case "documentario":
          idGenero = "99";
          break;
        case "fantasia":
          idGenero = "10765";
          break;
        case "terror":
          idGenero = "9648";
          break;
        case "ficcaoCientifica":
          idGenero = "10765";
          break;
        case "romance":
          idGenero = "10766";
          break;
        case "suspense":
          idGenero = "9648";
          break;
        default:
          break;
      }
      await desenharSeries(idGenero, inicial, final);
      limparSelect();
    }
  });
}

const tipo = document.getElementById("tipo");
const duracaoDiv = document.querySelector('.duracao-div');
const classificacaoDiv = document.querySelector('.classificacao-div');

if(tipo) {
  tipo.addEventListener("change", function(event) {
    event.preventDefault();
    
    if(tipo.value === "serie") {

      const duracao = document.getElementById("duracao");
      const classificacao = document.getElementById("classificacao");
      const labelDuracao = document.getElementById("label-duracao");
      const labelClassificacao = document.getElementById("label-classificacao");

      if(duracao) duracao.remove();
      if(labelDuracao) labelDuracao.remove();
      if(classificacao) classificacao.remove();
      if(labelClassificacao) labelClassificacao.remove();

      duracaoDiv.classList.remove('d-flex');
      duracaoDiv.classList.add('d-none');
      classificacaoDiv.classList.remove('d-flex');
      classificacaoDiv.classList.add('d-none');

    } else if(tipo.value === "filme") {

      const duracao = document.getElementById("duracao");
      const classificacao = document.getElementById("classificacao");
      const labelDuracao = document.getElementById("label-duracao");
      const labelClassificacao = document.getElementById("label-classificacao");

      if(!duracao && !classificacao && !labelDuracao && !labelClassificacao) {
        classificacaoDiv.insertAdjacentHTML('beforeend', `
        <label for="classificacao" id="label-classificacao" class="classificacao mb-2">Classificação indicativa <span class="required">*</span></label>
        <select name="classificacao" id="classificacao">
          <option value="">Selecione...</option>
          <option value="livre">Livre</option>
          <option value="10">10+</option>
          <option value="12">12+</option>
          <option value="14">14+</option>
          <option value="16">16+</option>
        </select>
        `);
        duracaoDiv.insertAdjacentHTML('beforeend', `
        <label for="duracao" id="label-duracao" class="duracao mb-2">Duração <span class="required">*</span></label>
        <select name="duracao" id="duracao">
          <option value="">Selecione...</option>
          <option value="130">Até 1:30h</option>
          <option value="1302">1:30 a 2h</option>
          <option value="m2">Mais de 2h</option>
        </select>
        `);
        duracaoDiv.classList.remove('d-none');
        duracaoDiv.classList.add('d-flex');
        classificacaoDiv.classList.remove('d-none');
        classificacaoDiv.classList.add('d-flex');
      }
    }
  });
}

const genero = document.getElementById("genero");
const classificacao = document.getElementById("classificacao");

if(genero) {
  genero.addEventListener("change", function(event) {
    event.preventDefault();
    const opcaoL = classificacao.querySelector('option[value="livre"]');
    const opcao10 = classificacao.querySelector('option[value="10"]');
    const opcao12 = classificacao.querySelector('option[value="12"]');
    const opcao14 = classificacao.querySelector('option[value="14"]');
    const opcao16 = classificacao.querySelector('option[value="16"]');
    if (genero.value === "crime") {
      if(opcaoL) opcaoL.remove(); 
      if(opcao10) opcao10.remove(); 
      if(opcao12)  opcao12.remove(); 
      
    } else if(genero.value != "crime") {
      if (!opcao10 && !opcao12 & !opcaoL) {

        const opcaoL = classificacao.querySelector('option[value="livre"]');
        const opcao10 = classificacao.querySelector('option[value="10"]');
        const opcao12 = classificacao.querySelector('option[value="12"]');

        if(opcao14) opcao14.remove();
        if(opcao16) opcao16.remove();

        classificacao.insertAdjacentHTML("beforeend", `
          <option value="livre">Livre</option>
          <option value="10">10+</option>
          <option value="12">12+</option>'
          <option value="14">14+</option>
          <option value="16">16+</option>
        `);
      }
    }
  });
}

const abrirQuestionario = document.querySelector('.abrir_questionario');
const off = document.querySelector('.off');
const formQuestionario = document.querySelector('.form_questionario');
const questionario = document.querySelector('.questionario');

if(abrirQuestionario && off) {
    abrirQuestionario.addEventListener("click", function(event) {
      event.preventDefault();
      off.style.backgroundColor = 'transparent';
      off.style.color = 'white';

      abrirQuestionario.style.backgroundColor = '#fff';
      abrirQuestionario.style.color = 'rgb(0, 0, 0)';

      formQuestionario.classList.remove('d-none');
      formQuestionario.classList.add('d-flex');
    });
}

if(abrirQuestionario && off) {
     off.addEventListener("click", function(event) {
      event.preventDefault();
      off.style.backgroundColor = '#fff';
      off.style.color = 'rgb(0, 0, 0)';

      abrirQuestionario.style.backgroundColor = 'transparent';
      abrirQuestionario.style.color = 'white';

      formQuestionario.classList.remove('d-flex');
      formQuestionario.classList.add('d-none');
    });
}

const searchBtn = document.querySelector('.search_btn');
const searchInput = document.querySelector('.search_input');

if(searchBtn) {
    searchBtn.addEventListener("click", async function(event) {
      event.preventDefault();
      const pesquisa = searchInput.value.trim();
      localStorage.setItem("pesquisa", pesquisa);
      window.location.href = 'pesquisa.html';
    });
}

async function pegarLancamentos() {
    const res = await fetch("https://api-nextpick.onrender.com/pegarLancamentos");
    const data = await res.json();
    return data;
}

const postersLancamento = document.querySelector('.titulos');
  async function desenharLancamentos() {
    const chamada = await pegarLancamentos();
    const data = chamada.data.results;

    for(let i = 0; i < data.length; i++) {
        const button = document.createElement("button");
        button.style.width = '150px';
        button.style.minWidth = '150px'; 
        button.style.height = '225px';
        button.style.minHeight = '225px';
        button.classList.add("filmesBtn");
        button.style.borderRadius = '15px';
        button.style.backgroundColor = 'black';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        button.style.textDecoration = 'none';
        button.style.transition = 'all 0.3s ease';
        button.style.position = 'relative';
        button.style.border = 'none';
        button.style.margin = '0';
        button.style.padding = '0';
        button.style.flexDirection = "column";
        button.style.marginBottom = "90px";

        const img = document.createElement("img");
        if(!data[i].poster_path) {
            img.src = "../imagens/desconhecido.png";
            img.style.width = 'auto';
            img.style.height = 'auto';
        }else {
            img.src = 'https://image.tmdb.org/t/p/original' + data[i].poster_path;
            img.style.width = '100%';
            img.style.height = '100%';
        }
        img.style.objectFit = 'cover';
        img.style.border = 'none';
        img.style.display = 'block';
        img.style.zIndex = '2';
        img.style.borderRadius = '15px';

        button.dataset.poster = 'https://image.tmdb.org/t/p/original' + data[i].poster_path;

        button.dataset.backdrop = 'https://image.tmdb.org/t/p/original' + data[i].backdrop_path;

        button.dataset.genreId = data[i].genre_ids;

        button.dataset.id = data[i].id;

        button.dataset.tipo = 'filme';

        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.setProperty('--rate', Math.round(data[i].vote_average * 10));
        const valor = Math.round(data[i].vote_average * 10);
        if(valor >=70) {
          circle.style.setProperty('--cor', '#21d07a');
        } else if(valor < 70) {
          circle.style.setProperty('--cor', '#d2d531');
        } else if(valor < 50) {
          circle.style.setProperty('--cor', '#ff0000ff');
        }

        button.dataset.rate = valor;

        const span = document.createElement("span");
        span.textContent = Math.round(data[i].vote_average * 10) + "%";
        span.style.color = 'white';
        span.style.fontSize = '12px';

        const divTitulo  = document.createElement("div");
        divTitulo.style.width = '170px';
        divTitulo.style.height = '120px';
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
        titulo.textContent = data[i].title;
        titulo.style.color = 'black';
        titulo.style.fontSize = '15px';
        titulo.style.fontWeight = 'bold';
        titulo.style.alignSelf = 'left';
        titulo.style.textAlign = 'left';
        titulo.style.marginLeft = '10px';

        const lancamento = document.createElement("span");
        const dataCompleta = data[i].release_date;
        const partes = dataCompleta.split("-");
        const dataMes = new Date(partes[0], partes[1] - 1);
        const dataAno = partes[0];
        const stringMes = dataMes.toLocaleString('default', { month: 'short'});
        const r = stringMes.replace('.', '');
        const stringData = r + ' ' + partes[2] + ', ' + partes[0];
        lancamento.textContent = stringData;
        lancamento.style.color = 'black';
        lancamento.style.fontSize = '14px';
        lancamento.style.alignSelf = 'left';
        lancamento.style.textAlign = 'left';
        lancamento.style.marginLeft = '10px';
        lancamento.classList.add("dataCompleta");

        button.dataset.titulo = titulo.textContent;

        button.dataset.dataCompleta = stringData;

        button.dataset.dataAno = dataAno;

        button.appendChild(img);
        button.appendChild(circle);
        divTitulo.appendChild(titulo);
        divTitulo.appendChild(lancamento);
        circle.appendChild(span);
        button.appendChild(divTitulo);
        postersLancamento.appendChild(button);

        button.addEventListener('mouseenter', () => {
          button.style.backgroundColor = '#00000031';
          button.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.backgroundColor = 'transparent';
          button.style.transform = 'scale(1)';
        });
    }
}

if(postersLancamento) {
    desenharLancamentos();
}

async function pegarUsuario(){
    const res = await fetch("https://api-nextpick.onrender.com/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
    });
    const data = await res.json();
    
    if(data.success){
     	return data;
    }  else {
      firebaseError = data.error;
      toastr.erro(firebaseError);
      return;
    }
}

async function verificaToken(){
  const res = await fetch("https://api-nextpick.onrender.com/verificaToken", {
    method: "POST",
    credentials: "include"
  });
  return res.ok; 
}

async function carregarDados() {
	let data = '';
	const verificacaoUsuario = await verificaToken();

  if(!verificacaoUsuario) {
      window.location.href = '../index.html';
      return;
    }
  else data = await pegarUsuario();
	
	if(!data) console.log('erro na data');
	
	let email = data.email;
	let fotoUrl = data.photoURL;
	let nomeUsuario = data.displayName;
	let dataMeta = data.metaData;
	
	const avatarMenuNome = document.querySelector('.avatar-menu');
	const userAvatar = document.querySelector('.avatar-img');
	
	if(!nomeUsuario && avatarMenuNome) {
    	avatarMenuNome.textContent = 'Usuario';
    } else if(nomeUsuario && avatarMenuNome) {
    	const primeiraLetra = nomeUsuario.slice(0, 2).toUpperCase();
    	avatarMenuNome.textContent = primeiraLetra;
    } if(fotoUrl && userAvatar) {
      	userAvatar.src = fotoUrl; 
      	const nomeUser = document.querySelector('.nomeUsuario');
      	
      	if(!nomeUsuario && nomeUser) {
        	nomeUser.textContent = 'Usuario'; 
      	} else if(nomeUsuario && nomeUser) {
        	nomeUser.textContent = nomeUsuario;
      	} 
      	
      	const metaData = document.querySelector('.metadata') ;
      	if(metaData && dataMeta && dataMeta.creationTime) {
  			const partes = dataMeta.creationTime.split(' ');
  			metaData.textContent = 'Conta criada em ' + partes[2] + ' ' + partes[3];
	  	}
    } if(fotoUrl === undefined) {
      fotoUrl = "https://api.dicebear.com/9.x/rings/svg?seed=Liam";
      userAvatar.src = fotoUrl;
    }
}

document.addEventListener("DOMContentLoaded", async function() {
	carregarDados();
});

