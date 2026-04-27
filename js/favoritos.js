"use strict"

async function chamadaApiFavoritos(){
	const res = await fetch("https://api-nextpick.onrender.com/carregarFavoritos", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include"
	});

	const data = await res.json();

	if(data.success) {
		return data;
	} else {
		return false;
	}
}

let totalFilmesFav = 0;
let totalSeriesFav = 0;
let totalFilmesLista = 0;
let totalSeriesLista = 0;

const meusFavoritos = document.querySelector(".meus_favoritos");
const lista = document.querySelector(".lista");

if(meusFavoritos) {
	meusFavoritos.addEventListener("click", function(e) {
		const listaFilmes = e.target.closest('.selector_filmes');
		const listaSeries = e.target.closest('.selector_series');
		const underlineFilmes = meusFavoritos.querySelector('.underline_filmes');
		const underlineSeries = meusFavoritos.querySelector('.underline_series');
		const favoritosFilme = meusFavoritos.querySelector('.favoritos_filme_div');
		const favoritosSerie = meusFavoritos.querySelector('.favoritos_serie_div');
		const postersFavoritosFilme = meusFavoritos.querySelector('.favoritos_filme');
		const postersFavoritosSerie = meusFavoritos.querySelector('.favoritos_serie');
		if(listaFilmes) {
			underlineFilmes.style.backgroundColor = '#01d277';
			underlineFilmes.style.height = '4px';
			underlineSeries.style.backgroundColor = 'transparent';
			underlineSeries.style.height = '0px';

			favoritosFilme.classList.remove("d-none");
			favoritosFilme.classList.add("d-flex");
			favoritosSerie.classList.remove("d-flex");
			favoritosSerie.classList.add("d-none");
		}
		if(listaSeries) {
			underlineFilmes.style.backgroundColor = 'transparent';
			underlineFilmes.style.height = '0px';
			underlineSeries.style.backgroundColor = '#01d277';
			underlineSeries.style.height = '4px';

			favoritosSerie.classList.remove("d-none");
			favoritosSerie.classList.add("d-flex");
			favoritosFilme.classList.remove("d-flex");
			favoritosFilme.classList.add("d-none");
		}
	});
}

if(lista) {
	lista.addEventListener("click", function(e) {
		const listaFilmes = e.target.closest('.selector_filmes');
		const listaSeries = e.target.closest('.selector_series');
		const underlineFilmes = lista.querySelector('.underline_filmes');
		const underlineSeries = lista.querySelector('.underline_series');
		const listaFilme = lista.querySelector('.lista_filme_div');
		const listaSerie = lista.querySelector('.lista_serie_div');
		
		if(listaFilmes) {
			underlineFilmes.style.backgroundColor = '#01d277';
			underlineFilmes.style.height = '4px';
			underlineSeries.style.backgroundColor = 'transparent';
			underlineSeries.style.height = '0px';

			listaFilme.classList.remove("d-none");
			listaFilme.classList.add("d-flex");
			listaSerie.classList.remove("d-flex");
			listaSerie.classList.add("d-none");
		}
		if(listaSeries) {
			underlineFilmes.style.backgroundColor = 'transparent';
			underlineFilmes.style.height = '0px';
			underlineSeries.style.backgroundColor = '#01d277';
			underlineSeries.style.height = '4px';

			listaSerie.classList.remove("d-none");
			listaSerie.classList.add("d-flex");
			listaFilme.classList.remove("d-flex");
			listaFilme.classList.add("d-none");
		}
	});
}

async function desenharFav() {
	const chamada = await chamadaApiFavoritos();
	const f = chamada.favoritos;
	const postersFilmes = document.querySelector('.favoritos_filme');
	const postersSeries = document.querySelector('.favoritos_serie');
	const postersFilmesDiv = document.querySelector('.favoritos_filme_div');
	const postersSeriesDiv = document.querySelector('.favoritos_serie_div');
	const qtdFilmes = document.querySelector('.qtd_filmes_fav');
	const qtdSeries = document.querySelector('.qtd_series_fav');

	let fT = 0;
	let sT = 0;

	totalFilmesFav = f.filter(item => item.favorito[0].tipo === 'filme').length;
	totalSeriesFav = f.filter(item => item.favorito[0].tipo === 'serie').length;

	if(totalFilmesFav <= 0) {
		const span = document.createElement("span");
        span.style.color = '#a8a8a8';
        span.style.fontSize = '17px';
        span.style.fontWeight = '300';
        span.textContent = 'Sem filmes nos favoritos pra exibir';

        postersFilmes.style.display = 'flex';
        postersFilmes.style.justifyContent = 'flex-start';
        postersFilmes.style.alignItems = 'flex-start';
        postersFilmes.style.padding = '20px';

        postersFilmes.appendChild(span);
	} if(totalSeriesFav <= 0) {
		const span = document.createElement("span");
        span.style.color = '#a8a8a8';
        span.style.fontSize = '17px';
        span.style.fontWeight = '300';
        span.textContent = 'Sem séries nos favoritos pra exibir';

        postersSeries.style.display = 'flex';
        postersSeries.style.justifyContent = 'flex-start';
        postersSeries.style.alignItems = 'flex-start';
		postersSeries.style.padding = '20px';

        postersSeries.appendChild(span);
	} 

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

			const divTitulo = document.createElement("div");
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

			const divTitulo = document.createElement("div");
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
	const res = await fetch("https://api-nextpick.onrender.com/carregarLista", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include"
	});

	const data = await res.json();

	if(data.success) {
		return data;
	} else {
		return false;
	}
}

async function desenharLista() {
	const chamada = await chamadaApiLista();
	const l = chamada.lista;
	const postersFilmes = document.querySelector('.lista_filme');
	const postersSeries = document.querySelector('.lista_serie');
	const postersFilmesDiv = document.querySelector('.lista_filme_div');
	const postersSeriesDiv = document.querySelector('.lista_serie_div');
	const qtdFilmes = document.querySelector('.qtd_filmes_lista');
	const qtdSeries = document.querySelector('.qtd_series_lista');

	const listaDiv = document.querySelector('.lista');

	let fT = 0;
	let sT = 0;

	totalFilmesLista = l.filter(item => item.lista[0].tipo === 'filme').length;
 	totalSeriesLista = l.filter(item => item.lista[0].tipo === 'serie').length;

	if(totalFilmesLista <= 0) {
		const span = document.createElement("span");
        span.style.color = '#a8a8a8';
        span.style.fontSize = '17px';
        span.style.fontWeight = '300';
        span.textContent = 'Sem filmes na lista pra exibir';

        postersFilmes.style.display = 'flex';
        postersFilmes.style.justifyContent = 'flex-start';
        postersFilmes.style.alignItems = 'flex-start';
        postersFilmes.style.padding = '20px';

        postersFilmes.appendChild(span);
	} if(totalSeriesLista <= 0) {
		const span = document.createElement("span");
        span.style.color = '#a8a8a8';
        span.style.fontSize = '17px';
        span.style.fontWeight = '300';
        span.textContent = 'Sem séries na lista pra exibir';

        postersSeries.style.display = 'flex';
        postersSeries.style.justifyContent = 'flex-start';
        postersSeries.style.alignItems = 'flex-start';
        postersSeries.style.padding = '20px';

        postersSeries.appendChild(span);
	} 

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

			const divTitulo = document.createElement("div");
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

			const divTitulo = document.createElement("div");
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

async function pegarUsuario(){
	const res = await fetch("https://api-nextpick.onrender.com/getUser", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
    	credentials: "include"
	});
	const data = await res.json();

	if(data.success){
		return data;
	} else {
		firebaseError = data.error;
		toastr.erro(firebaseError);
		photourl = "https://api.dicebear.com/9.x/dylan/svg?seed=Andrea";
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
	let nome = data.displayName;
	let metaData = data.metaData;

	const avatarUser = document.querySelector('.avatar-img');
	const avatarMenuNome = document.querySelector('.avatar-menu');
	const nomeUsuario = document.querySelector('.nomeUsuario');
	const metadata = document.querySelector('.metadata');

	if(metaData && metaData) {
		metadata.textContent = metaData.creationTime
	}
	
	if(!nome && avatarMenuNome) {
    	avatarMenuNome.textContent = 'Usuário';
		nomeUsuario.textContent = 'Usuário';
    } else if(nome && avatarMenuNome) {
    	const primeiraLetra = nome.slice(0, 2).toUpperCase();
    	avatarMenuNome.textContent = primeiraLetra;
		nomeUsuario.textContent = nome;
    } 
    
    const avatarImg = document.querySelector('.avatarImg');
      	
    if(avatarImg && avatarUser && fotoUrl) {
        avatarUser.src = fotoUrl;
    	avatarImg.src = fotoUrl;
    } else if(!fotoUrl) {
		avatarImg.src = 'https://api.dicebear.com/9.x/rings/svg?seed=Liam';
		avatarUser.src = 'https://api.dicebear.com/9.x/rings/svg?seed=Liam';
	}  	
}

document.addEventListener("DOMContentLoaded", async function() {
	carregarDados();
	desenharFav();
	desenharLista();
});
