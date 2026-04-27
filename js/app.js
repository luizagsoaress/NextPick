'use strict'

let firebaseError;

const erro = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
}

toastr.erro = function (mensagem, titulo = "Erro") {
	const old = toastr.options; 
    toastr.options = { ...toastr.options, ...erro }; 
    toastr.error(mensagem, titulo); 
    toastr.options = old;
};

const sucesso = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
}

toastr.sucesso = function (mensagem, titulo = "Deu certo!") {
	const old = toastr.options; 
    toastr.options = { ...toastr.options, ...sucesso }; 
    toastr.success(mensagem, titulo); 
    toastr.options = old;
};

function toggleConta() {
    const confBtn = document.getElementById('minha_conta');
    const menuConf = document.getElementById('minhaConta');
    confBtn.classList.toggle('active');
    menuConf.classList.toggle('active');
    document.body.style.overflow = menuConf.classList.contains('active') ? 'hidden' : 'auto';
}

function closeConta() {
    const confBtn = document.getElementById('minha_conta');
    const menuConf = document.getElementById('minhaConta');
    confBtn.classList.remove('active');
    menuConf.classList.remove('active');
    document.body.style.overflow = 'auto';
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

const meusDadosBtn = document.querySelector('.atualizar');

if(meusDadosBtn) {
    meusDadosBtn.addEventListener("click", function(event) {
    	event.preventDefault();
    	window.location.href = "perfil.html";
  	});
}

async function verificarIdentidade(email, password){
    const res = await fetch("https://api-nextpick.onrender.com/verificacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if(data.success){
      return true;
    } else {
      return false;
    }
}

async function verificaToken(){
  const res = await fetch("https://api-nextpick.onrender.com/verificaToken", {
    method: "POST",
    credentials: "include"
  });
  return res.ok; 
}
  
async function atualizarSenha(senhaNova) {
    const res = await fetch("https://api-nextpick.onrender.com/atualizarSenha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senhaNova }),
      credentials: "include"
    });
    const data = await res.json();
    if(data.success){
      toastr.sucesso("Senha alterada com sucesso.");
      setTimeout(() => {
      const divSenha = document.querySelector('.div-senha');
      divSenha.classList.remove("d-none");
      divSenha.classList.add("d-flex"); 
      const editarDiv = document.querySelector('.editar-div');
      editarDiv.classList.remove("d-flex");
      editarDiv.classList.add("d-none");
      const divEmail = document.querySelector('.div-email');
      divEmail.classList.remove("d-none");
      divEmail.classList.add("d-flex");
      const divDeletar = document.querySelector('.div-deletar');
      divDeletar.classList.remove("d-none");
      divDeletar.classList.add("d-flex");  
      }, 3000);
    } else {
      toastr.erro("Erro ao alterar senha.");
    }
}

const btnSair = document.querySelector('.sair');
  if(btnSair) {
    btnSair.addEventListener("click", function() {
      localStorage.clear();
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1000);
    });
}

async function chamadaApiGeneros(tipo) {
    const res = await fetch("https://api-nextpick.onrender.com/pegarGenero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify ({ tipo })
    });

    const data = await res.json();

    return data;
}

async function chamadaApiDetalhes(tipo, id){
    const res = await fetch("https://api-nextpick.onrender.com/detalhes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify ({ tipo, id })
    });

    const data = await res.json();

    return data;
}

async function chamadaApiCreditos(tipo, id){
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

async function chamadaApiStreaming(tipo, id){
    const res = await fetch("https://api-nextpick.onrender.com/ondeAssistir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify ({ tipo, id })
    });

    const data = await res.json();

    return data;
}

async function chamadaApiVideos(tipo, id){
    const res = await fetch("https://api-nextpick.onrender.com/pegarVideos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify ({ tipo, id })
    });

    const data = await res.json();

    return data;
}

document.addEventListener("click", async (e) => {
    if (e.target.closest('.btnFav') || e.target.closest('.btnWat') || e.target.closest('.fa-ellipsis') || e.target.closest('.dropdown-menu')) {
      return; 
	  }

    const botaoFilme = e.target.closest(".filmesBtn");
    const botaoSerie = e.target.closest(".seriesBtn");
    
    if (botaoFilme) {
      const bgPath = botaoFilme.dataset.backdrop; 
      const poster_path = botaoFilme.dataset.poster;
      const titulo = botaoFilme.dataset.titulo;

      const dataAno = botaoFilme.dataset.dataAno;
      const dataCompleta = botaoFilme.dataset.dataCompleta;

      localStorage.setItem("posterPath", poster_path);
      localStorage.setItem("bgPath", bgPath);
      localStorage.setItem("titulo", titulo);
      localStorage.setItem("dataAno", dataAno);
      localStorage.setItem("data", dataCompleta);

      const data = await chamadaApiGeneros('movie');
      const resultado = data.results;
      let nomeGenero = [];
      const partes = botaoFilme.dataset.genreId.split(",").map(Number);
      for(let i = 0; i < resultado.length; i++) {
        for(let j = 0; j < partes.length; j++) {
          if(resultado[i].id === partes[j]) {
            nomeGenero.push(resultado[i].name);
          }
        }
      }

      localStorage.setItem("nomeGenero", nomeGenero);

      const id = botaoFilme.dataset.id;
      const chamada = await chamadaApiDetalhes('movie', id);
      const detalhes = chamada.data;
      const classIdade = chamada.classificacao.results;
      const idade = classIdade.find(p => p.iso_3166_1 === "US")?.release_dates[0].certification;
      const tempo = detalhes.runtime;
      const originalLanguage = detalhes.original_language;
      const status = detalhes.status;
      const tagline = detalhes.tagline;
      const produtoras = detalhes.production_companies;
      let sinopse = detalhes.overview;
      if(sinopse === "") sinopse = '...';
      const originCountry = detalhes.origin_country;
      const score = Math.round(detalhes.vote_average * 10);
      const tipoFs = botaoFilme.dataset.tipo;

      const creditos = await chamadaApiCreditos('movie', id);
      const infos = creditos.data;
      const diretorNome = infos.crew.find(p => p.job === "Director")?.name;
      const diretorFuncao = infos.crew.filter(p => p.name === diretorNome).map(p => p.job);

      const servico = await chamadaApiStreaming('movie', id);
      const us = servico.data.US;
      if(us) {
        const disponiveis = us.flatrate;
        const aluguel = us.rent;
        const comprar = us.buy;

        if (disponiveis && disponiveis.length > 0) {
          const primeiro = disponiveis[0];
          localStorage.setItem("streaming", JSON.stringify(primeiro));
        } 
        else if (aluguel && aluguel.length > 0) {
          const primeiro = aluguel[0];
          localStorage.setItem("streaming", JSON.stringify(primeiro));
        } 
        else if (comprar && comprar.length > 0) {
          const primeiro = comprar[0];
          localStorage.setItem("streaming", JSON.stringify(primeiro));
        }
      }
      
      const video = await chamadaApiVideos('movie', id);
      const tipo = video.data;
      const key = tipo.filter(p => p.site?.toLowerCase() === "youtube").map(p => p.key);

      localStorage.setItem("duracao", tempo);
      localStorage.setItem("overview", sinopse);
      localStorage.setItem("diretorNome", diretorNome);
      localStorage.setItem("diretorFuncao", diretorFuncao);
      localStorage.setItem("originCountry", originCountry);
      localStorage.setItem("avaliacao", score);
      localStorage.setItem("id", id);
      localStorage.setItem("originalLanguage", originalLanguage);
      localStorage.setItem("status", status);
      localStorage.setItem("tagline", tagline);
      localStorage.setItem("produtoras", JSON.stringify(produtoras));
      localStorage.setItem("key", key);
      localStorage.setItem("tipo", tipoFs);
      localStorage.setItem("classificacao", idade);

      window.location.href = 'info.html';
    } else if (botaoSerie) {
      const bgPath = botaoSerie.dataset.backdrop; 
      const poster_path = botaoSerie.dataset.poster;
      const titulo = botaoSerie.dataset.titulo;

      const dataAno = botaoSerie.dataset.dataAno;
      const dataCompleta = botaoSerie.dataset.dataCompleta;

      localStorage.setItem("posterPath", poster_path);
      localStorage.setItem("bgPath", bgPath);
      localStorage.setItem("titulo", titulo);
      localStorage.setItem("dataAno", dataAno);
      localStorage.setItem("data", dataCompleta);

      const data = await chamadaApiGeneros('tv');
      const resultado = data.results;
      let nomeGenero = [];
      const partes = botaoSerie.dataset.genreId.split(",").map(Number);
      for(let i = 0; i < resultado.length; i++) {
        for(let j = 0; j < partes.length; j++) {
          if(resultado[i].id === partes[j]) {
            nomeGenero.push(resultado[i].name);
          }
        }
      }

      localStorage.setItem("nomeGenero", nomeGenero);

      const id = botaoSerie.dataset.id;
      const tipoFs = botaoSerie.dataset.tipo;
      const chamada = await chamadaApiDetalhes('tv', id);
      const detalhes = chamada.data;
      const originalLanguage = detalhes.original_language;
      const status = detalhes.status;
      const tagline = detalhes.tagline;
      const produtoras = detalhes.production_companies;
      const sinopse = detalhes.overview;
      const originCountry = detalhes.origin_country;
      const score = Math.round(detalhes.vote_average * 10);
      
      const creditos = await chamadaApiCreditos('movie', id);
      const infos = creditos.data;
      const criadorNome = detalhes.created_by.length > 0 ? detalhes.created_by.map(c => c.name) : ' — ';
      let criadorFuncao;
      if(criadorNome != ' — ') criadorFuncao = 'Creator'; 
      else criadorFuncao = ' ';

      const servico = await chamadaApiStreaming('tv', id);
      const us = servico.data.US;
      if(us) {
        const disponiveis = us.flatrate;
        const aluguel = us.rent;
        const comprar = us.buy;

        if (disponiveis && disponiveis.length > 0) {
          const primeiro = disponiveis[0];
          localStorage.setItem("streaming", JSON.stringify(primeiro));
        } 
        else if (aluguel && aluguel.length > 0) {
          const primeiro = aluguel[0];
          localStorage.setItem("streaming", JSON.stringify(primeiro));
        } 
        else if (comprar && comprar.length > 0) {
          const primeiro = comprar[0];
          localStorage.setItem("streaming", JSON.stringify(primeiro));
        }
      }
      

      const video = await chamadaApiVideos('tv', id);
      const tipo = video.data;
      const key = tipo.filter(p => p.site?.toLowerCase() === "youtube").map(p => p.key);

      localStorage.setItem("overview", sinopse);
      localStorage.setItem("diretorNome", criadorNome);
      localStorage.setItem("diretorFuncao", criadorFuncao);
      localStorage.setItem("originCountry", originCountry);
      localStorage.setItem("avaliacao", score);
      localStorage.setItem("id", id);
      localStorage.setItem("originalLanguage", originalLanguage);
      localStorage.setItem("status", status);
      localStorage.setItem("tagline", tagline);
      localStorage.setItem("produtoras", JSON.stringify(produtoras));
      localStorage.setItem("key", key);
      localStorage.setItem("tipo", tipoFs);

      window.location.href = 'info.html';
    }
});

async function addFavorito(favorito, id){
    const res = await fetch("https://api-nextpick.onrender.com/addFavoritos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorito, id}),
      credentials: "include"
    });

    const data = await res.json();

    if(data.success) {
      toastr.sucesso("Adicionado com sucesso.");
    } else {
      toastr.erro(data.message);
    }
}


document.addEventListener("click", function(e) {
    if (e.target.classList.contains("btnFav") && e.target.closest(".filmesBtn")) {
      const favorito = [];
      const pai = e.target.closest(".filmesBtn");
      const id = pai.dataset.id;

      favorito.push({
        tipo: pai.dataset.tipo,
        poster: pai.dataset.poster,
        titulo: pai.dataset.titulo,
        data: pai.dataset.dataCompleta,
      });

      addFavorito(favorito, id);
    } else if(e.target.classList.contains("btnFav") && e.target.closest(".seriesBtn")) {
      const favorito = [];
      const pai = e.target.closest(".seriesBtn");
      const id = pai.dataset.id;

      favorito.push({
        tipo: pai.dataset.tipo,
        poster: pai.dataset.poster,
        titulo: pai.dataset.titulo,
        data: pai.dataset.dataCompleta,
      });

      addFavorito(favorito, id);
    }
});

async function addLista(lista, id){
    const res = await fetch("https://api-nextpick.onrender.com/addLista", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lista, id}),
      credentials: "include"
    });

    const data = await res.json();

    if(data.success) {
      toastr.sucesso("Adicionado com sucesso.");
    } else {
      toastr.erro(data.message);
    }
}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("btnWat") && e.target.closest(".filmesBtn")) {
      const lista = [];
      const pai = e.target.closest(".filmesBtn");
      const id = pai.dataset.id;

      lista.push({
        tipo: pai.dataset.tipo,
        poster: pai.dataset.poster,
        titulo: pai.dataset.titulo,
        data: pai.dataset.dataCompleta,
      });

      addLista(lista, id);
    } else if(e.target.classList.contains("btnWat") && e.target.closest(".seriesBtn")) {
      const lista = [];
      const pai = e.target.closest(".seriesBtn");
      const id = pai.dataset.id;

      lista.push({
        tipo: pai.dataset.tipo,
        poster: pai.dataset.poster,
        titulo: pai.dataset.titulo,
        data: pai.dataset.dataCompleta,
      });

      addLista(lista, id);
    }
});

const btnStart = document.querySelector('btn_descobrir');

if(btnStart) {
    btnStart.addEventListener("click", async function() {
    	let data = '';
    	if(usuario) {
    		data = await pegarUsuario();
    	}
    	
    	let fotoUrl = data.photoURL;
    	
    	if(fotoUrl && user) {
      	user.src = fotoUrl;
    	}
    	const inputEmail = document.querySelector('.input-email');
    	if(inputEmail) {
      	inputEmail.placeholder = email;
    	}
  	});
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
}

const menuFavoritos = document.querySelector('.favoritos');
if(menuFavoritos) {
  menuFavoritos.addEventListener("click", function(event) {
		event.preventDefault();
		window.location.href = 'favoritos.html';
	});
}
  
document.addEventListener("DOMContentLoaded", async function() {
    carregarDados();
});

  


  




