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
  async function deletarConta() {
    const token = localStorage.getItem("token");
    if(!token) return;
    const res = await fetch("https://api-nextpick.onrender.com/deletar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if(data.success) {
      toastr.sucesso(data.message);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    } else {
      firebaseError = data.error;
      toastr.erro(firebaseError);
    }
  }
  const deletarContaBtn = document.querySelector('.deletar');
  if(deletarContaBtn) {
    deletarContaBtn.addEventListener("click", function(event) {
    event.preventDefault();
    deletarConta();
  });
  }
  const meusDadosBtn = document.querySelector('.atualizar');
  if(meusDadosBtn) {
    meusDadosBtn.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "perfil.html";
  });
  }

  let email;
  let photourl;
  let nomeUsuario;
  let dataMeta;

  async function pegarUsuario(){
    const uid = localStorage.getItem("uid");
    const res = await fetch("https://api-nextpick.onrender.com/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid }),
    });
    const data = await res.json();
    
    if(data.success){
      email = data.email;
      photourl = data.photoURL;
      nomeUsuario = data.displayName;
      dataMeta = data.metaData;
    }  else {
      firebaseError = data.error;
      toastr.erro(firebaseError);
      photourl = "https://api.dicebear.com/9.x/dylan/svg?seed=Andrea";
    }
  }

  const editarSenhaBtn = document.querySelector('.editar-senha');
  if(editarSenhaBtn) {
  editarSenhaBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const divSenha = document.querySelector('.div-senha');
    divSenha.classList.remove("d-flex");
    divSenha.classList.add("d-none"); 
    const divEmail = document.querySelector('.div-email');
    divEmail.classList.remove("d-flex");
    divEmail.classList.add("d-none");
    const divDeletar = document.querySelector('.div-deletar');
    divDeletar.classList.remove("d-flex");
    divDeletar.classList.add("d-none");
    const atualizarSenhaDiv = document.querySelector('.editar-div');
    atualizarSenhaDiv.classList.remove("d-none");
    atualizarSenhaDiv.classList.add("d-flex"); 
  });
  }

  const voltarBtn = document.querySelector('.voltar');
  if(voltarBtn) {
  voltarBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const divSenha = document.querySelector('.div-senha');
    divSenha.classList.remove("d-none");
    divSenha.classList.add("d-flex"); 
    const divEmail = document.querySelector('.div-email');
    divEmail.classList.remove("d-none");
    divEmail.classList.add("d-flex");
    const editarDiv = document.querySelector('.editar-div');
    editarDiv.classList.remove("d-flex");
    editarDiv.classList.add("d-none"); 
    const divDeletar = document.querySelector('.div-deletar');
    divDeletar.classList.remove("d-none");
    divDeletar.classList.add("d-flex");
  });
  }

  const voltarPrincipalBtn = document.querySelector('.voltar-main');
  if(voltarPrincipalBtn) {
  voltarPrincipalBtn.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "main.html";
  });
  }

  const inicioTopoBtn = document.querySelector('.inicio');
  if(inicioTopoBtn) {
    inicioTopoBtn.addEventListener("click", function(event) {
      event.preventDefault();
      const inicio = document.querySelector('.container-fluid');
      inicio.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const recomendarFilmesPadrao = document.querySelector('.recomendar-filmes');
  const postersFilmesPadrao = document.querySelector('.filmes_posters');
  if(recomendarFilmesPadrao) {
  recomendarFilmesPadrao.addEventListener("click", async function(event) {
    event.preventDefault();
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
      const button = document.createElement("button");
      button.style.width = '170px';
      button.style.height = '250px';
      button.style.borderRadius = '20px';
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
      button.style.marginBottom = "60px";

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

      const pontos = document.createElement("button");
      pontos.classList.add("fa-solid", "fa-ellipsis");
      pontos.style.borderRadius = '50%';
      pontos.style.backgroundColor = '#eeeeee';
      pontos.style.border = 'none';
      pontos.style.width = '23px';
      pontos.style.height = '23px';
      pontos.style.display = 'flex';
      pontos.style.right = '8px';
      pontos.style.justifyContent = 'center';
      pontos.style.alignItems = 'center';
      pontos.style.fontSize = '18px';
      pontos.style.position = 'absolute';
      pontos.style.top = '+15px';

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

      button.appendChild(img);
      button.appendChild(circle);
      button.appendChild(pontos);
      divTitulo.appendChild(titulo);
      divTitulo.appendChild(lancamento);
      circle.appendChild(span);
      button.appendChild(divTitulo);
      postersFilmesPadrao.appendChild(button);
      
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
    }
    postersFilmesPadrao.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  }

  const recomendarSeriesPadrao = document.querySelector('.recomendar-series');
  const postersSeriesPadrao = document.querySelector('.series_posters');
  if(recomendarSeriesPadrao) {
  recomendarSeriesPadrao.addEventListener("click", async function(event) {
    event.preventDefault();
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
    const button = document.createElement("button");
    button.style.width = '170px';
    button.style.height = '250px';
    button.style.borderRadius = '20px';
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
    button.style.marginBottom = "60px";

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

    const pontos = document.createElement("button");
    pontos.classList.add("fa-solid", "fa-ellipsis");
    pontos.style.borderRadius = '50%';
    pontos.style.backgroundColor = '#eeeeee';
    pontos.style.border = 'none';
    pontos.style.width = '23px';
    pontos.style.height = '23px';
    pontos.style.display = 'flex';
    pontos.style.right = '8px';
    pontos.style.justifyContent = 'center';
    pontos.style.alignItems = 'center';
    pontos.style.fontSize = '18px';
    pontos.style.position = 'absolute';
    pontos.style.top = '+15px';

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
    lancamento.textContent = series[i].first_air_date;
    lancamento.style.color = 'white';
    lancamento.style.fontSize = '13px';
    lancamento.style.alignSelf = 'left';
    lancamento.style.textAlign = 'left';
    lancamento.style.marginLeft = '10px';

    button.appendChild(img);
    button.appendChild(circle);
    button.appendChild(pontos);
    divTitulo.appendChild(titulo);
    divTitulo.appendChild(lancamento);
    circle.appendChild(span);
    button.appendChild(divTitulo);
    postersSeriesPadrao.appendChild(button);
      
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
  }
    postersSeriesPadrao.scrollIntoView({ behavior: "smooth", block: "start" });
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

  async function verificaToken(token){
    const res = await fetch("https://api-nextpick.onrender.com/verificaToken", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "accept": "application/json"
    }
    });
    const data = await res.json();
    if(data.success){
      return true;
    } else {
      return false;
    }
  }
  
  async function atualizarSenha(senhaNova) {
    const token = localStorage.getItem("token");
    if(!token) return;

    const res = await fetch("https://api-nextpick.onrender.com/atualizarSenha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, senhaNova }),
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
  const confirmarAtSenha = document.querySelector(".confirmar");
  if(confirmarAtSenha){
    confirmarAtSenha.addEventListener("click", async function(event) {
      event.preventDefault();
        const senhaNova = document.getElementById("senhaNova").value.trim();
        await atualizarSenha(senhaNova);
    });
  }
  const banBtn = document.querySelector(".ban");
  if(banBtn){
    banBtn.addEventListener("click", async function(event) {
      event.preventDefault();
      toastr.erro("Não é possivel alterar o email.");
    });
  }

  const btnSair = document.querySelector('.sair');
  if(btnSair) {
    btnSair.addEventListener("click", function() {
      localStorage.clear();
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }

  async function salvarFoto(foto) {
    const uid = localStorage.getItem("uid");
    const res = await fetch("https://api-nextpick.onrender.com/atualizarFoto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, foto }),
    });
    const data = await res.json();
    if(data.success){
      toastr.sucesso("Foto alterada com sucesso.");
    } else {
      toastr.erro("Erro ao alterar foto.");
    }
  } 

  const avatares = document.querySelectorAll('.avatares');
  const user = document.querySelector('.avatar-img');
  if(avatares) {
  avatares.forEach(avatar => {
  avatar.addEventListener('click', async () => {
    let imgSrc = '';
    user.innerHTML = "";
    if (avatar.classList.contains('avatar1')) {
      imgSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=Andrea";
    } else if (avatar.classList.contains('avatar2')) {
      imgSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=Sara";
    } else if (avatar.classList.contains('avatar3')) {
      imgSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=Oliver";
    } else if (avatar.classList.contains('avatar4')) {
      imgSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=Vivian";
    } else if (avatar.classList.contains('avatar5')) {
      imgSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=Luis";
    } else if (avatar.classList.contains('avatar6')) {
      imgSrc = "https://api.dicebear.com/9.x/dylan/svg?seed=Alexander";
    }
    await salvarFoto(imgSrc);
    user.src = imgSrc;
  });
  });
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

  async function chamadaApiGeneros(tipo) {
    const res = await fetch("https://api-nextpick.onrender.com/pegarGenero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify ({ tipo})
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

  let total = 0;

  function desenharNotificacao(total, x, title) {
    const notificacaoDiv = document.querySelector('.notificacoes_div');
    const notY = document.querySelector('.not_y');
    notY.classList.remove("d-flex");
    notY.classList.add("d-none");

    const div = document.createElement("div");
    div.style.width = '100%';
    div.style.height = 'auto';
    div.style.display = 'flex';
    div.style.justifyContent = 'left';
    div.style.paddingBottom = '0.5rem';
    div.style.flexDirection = 'column';

    const titulo = document.createElement("span");
    titulo.textContent = title;
    titulo.style.fontSize = '14px';
    titulo.style.fontWeight = 'bold';
    titulo.style.paddingLeft = '0.75rem';
    titulo.style.color = '#f86f6fff';

    const span = document.createElement("span");
    span.textContent = x ;
    span.style.color = 'black';
    span.style.fontSize = '14px';
    span.style.fontWeight = '500';
    span.style.paddingLeft = '0.75rem';

    const divPontos = document.createElement("div");
    divPontos.style.width = '100%';
    divPontos.style.height = 'auto';
    divPontos.style.display = 'flex';
    divPontos.style.justifyContent = 'left';
    divPontos.style.paddingTop = '0.2rem';
    divPontos.style.flexDirection = 'column';

    const pontos = document.createElement("span");
    pontos.textContent = '...';
    pontos.style.fontSize = '12px';
    pontos.style.fontWeight = 'bold';
    pontos.style.paddingLeft = '0.75rem';
    pontos.style.color = '#00000059';

    if(total > 1) {
        notificacaoDiv.innerHTML = ' ';
        divPontos.appendChild(pontos);
        notificacaoDiv.appendChild(divPontos);
    }

    div.appendChild(titulo);
    div.appendChild(span);
    notificacaoDiv.appendChild(div);

    const novoNot = document.querySelector('.novo');
    novoNot.classList.remove("d-none");
    novoNot.classList.add("d-flex");

  }

  const btnNotificacao = document.querySelector('.notificacao_btn');
  if(btnNotificacao) {
    btnNotificacao.addEventListener("click", function(event) {
      const novoNot = document.querySelector('.novo');
      novoNot.classList.remove("d-flex");
      novoNot.classList.add("d-none");
    });
  }

  async function addFavorito(favorito, id){
    const token = localStorage.getItem("token");
    const res = await fetch("https://api-nextpick.onrender.com/addFavoritos", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ favorito, id}),
    });

    const data = await res.json();

    const titulo = favorito[0].titulo;
    if(data.success) {
      toastr.sucesso("Adicionado com sucesso.");
      total++;
      desenharNotificacao(total, 'foi favoritado.', titulo);
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
    const token = localStorage.getItem("token");
    const res = await fetch("https://api-nextpick.onrender.com/addLista", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ lista, id}),
    });

    const data = await res.json();

    const titulo = lista[0].titulo;
    if(data.success) {
      toastr.sucesso("Adicionado com sucesso.");
      total++;
      desenharNotificacao(total, 'foi adicionado a lista.', titulo);
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
    const usuario = localStorage.getItem("uid");
    if(usuario) await pegarUsuario();
    if(photourl && user) {
      user.src = photourl;
    }
    const inputEmail = document.querySelector('.input-email');
    if(inputEmail) {
      inputEmail.placeholder = email;
    }
  });
  }

  const abrirQuestionario = document.querySelector('.abrir_questionario');
  const off = document.querySelector('.off');
  const formQuestionario = document.querySelector('.form_questionario');

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

  const menuFavoritos = document.querySelector('.favoritos');
  if(menuFavoritos) {
    menuFavoritos.addEventListener("click", function(event) {
      event.preventDefault();
      window.location.href = 'favoritos.html';
    });
  }

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

  let tempo = 0;         
  let intervalo = null;
  const max = 60 * 60;     

  function iniciarTempo() {
      if (intervalo) {
        return; 
      }
      intervalo = setInterval(() => {
          tempo++;
          if (tempo >= max) {
              sair();
          }
      }, 1000);
  }

  function pausarTempo() {
      clearInterval(intervalo);
      intervalo = null;
  }

  document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        iniciarTempo();
      } else {
        iniciarTempo();
      }
  });

  window.addEventListener("blur", pausarTempo);
  window.addEventListener("focus", iniciarTempo);

  iniciarTempo();

  function sair() {
      pausarTempo();
      localStorage.clear();
      window.location.href = "index.html";
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
            img.src = "../imagens/img_desconhecido.png";
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
  
  document.addEventListener("DOMContentLoaded", async function() {
    const usuario = localStorage.getItem("token");

    if(!usuario) window.location.href = 'index.html';
    if(usuario) await pegarUsuario();

    if(photourl && user) {
      user.src = photourl; 
      const nomeUser = document.querySelector('.nomeUsuario');
      const avatarImg = document.querySelector('.avatarImg');
      avatarImg.src = photourl;
      if(!nomeUsuario) {
        nomeUser.textContent = 'Usuario'; 
      }else {
        nomeUser.textContent = nomeUsuario;
      } 
      const metaData = document.querySelector('.metadata') ;
      const partes = dataMeta.creationTime.split(' ');
      metaData.textContent = 'Conta criada em ' + partes[2] + ' ' + partes[3];
    } if(photourl === undefined) {
      photourl = "https://api.dicebear.com/9.x/dylan/svg?seed=Andrea";
      user.src = photourl;
    }
    
    const inputEmail = document.querySelector('.input-email');
    if(inputEmail) {
      inputEmail.placeholder = email;
    }
  });

  


  




