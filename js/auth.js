'use strict'

  let firebaseError;

  function googleID() {
    google.accounts.id.initialize({
      client_id: "1022328638169-21vlpa3lblp7ro0hudc7ts0qanl1vd2f.apps.googleusercontent.com",
      callback: loginGoogle
    });

    google.accounts.id.prompt(); 
  }

 
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

  toastr.falha = function (mensagem, titulo = "Erro") {
    const old = toastr.options; 
    toastr.options = { ...toastr.options, ...erro }; 
    toastr.error(mensagem, titulo); 
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
  };

  async function loginGoogle(response){
    const id_token = response.credential;
    const res = await fetch("https://api-nextpick.onrender.com/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token }),
    });

    const data = await res.json();

    if(data.token || data.idToken){
      localStorage.setItem("token", data.token);
      localStorage.setItem("uid", data.uid);
      window.location.href = "main.html ";
    } else {
      firebaseError = data.error;
      toastr.falha(firebaseError);
    }
  }

  const googleBtn = document.querySelector(".google");

  if(googleBtn) {
    googleBtn.addEventListener("click", function(event) {
      event.preventDefault();
      googleID();
    });
  }
  
  function githubAcess(){
    const clientId = "Ov23li7mwsXVJSUAc3l9"; 
    const redirectUri = "https://luizagsoaress.github.io/NextPick/callback.html"; 
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    window.open(authUrl, "_blank", "width=500,height=600"); 

    window.addEventListener("message", (event) => {
      if (event.origin !== "https://luizagsoaress.github.io") return; 
      const data = event.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("uid", data.uid);
        window.location.href = "main.html"; 
      }
    });
  }

  const githubBtn = document.querySelector(".github");

  if(githubBtn) {
    githubBtn.addEventListener("click", function(event) {
      event.preventDefault();
      githubAcess();
    });
  }
  
  async function loginEmailSenha(email, password) {
    const res = await fetch("https://api-nextpick.onrender.com/loginUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) { 
      localStorage.setItem("token", data.token);
      localStorage.setItem("uid", data.uid);
      toastr.sucesso("Login realizado com sucesso.");
      setTimeout(() => {
        window.location.href = "main.html ";
      }, 2000);
    } else {
      firebaseError = data.error;
      toastr.falha(firebaseError, "Tivemos um problema aqui!");
    }
  }

  function gerarUsername() {
    const username = 'next' + Math.random().toFixed(4).toString(24).replace('.', '');
    return username;
  }

  async function criarEmailSenha(email, password){
    const username = gerarUsername();
    const res = await fetch("https://api-nextpick.onrender.com/createUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
    });

    const data = await res.json(); 

    if (data.success) { 
      loginEmailSenha(email, password);
    } else {
      firebaseError = data.error;
      toastr.falha(firebaseError);
    }
  }

  async function resetarSenha(email){
    const res = await fetch("https://api-nextpick.onrender.com/recuperar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) { 
      toastr.sucesso("Email enviado com sucesso, verifique a sua caixa de spam se necessário.");
      setTimeout(() => {
        window.location.href = "main.html ";
      }, 2000);
    } else {
      firebaseError = data.error;
      toastr.falha(firebaseError);
    }
  }

  document.addEventListener("DOMContentLoaded", function() {

    const formLogin = document.getElementById("formLogin");
    const formCadastro = document.getElementById("formCadastro");
    const formRecuperar = document.getElementById("formRecuperar");

    if(formLogin) {
      formLogin.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        loginEmailSenha(email, password);
      });
    }

    if(formCadastro) {
      formCadastro.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        criarEmailSenha(email, password);
      });
    }

    if(formRecuperar) {
      formRecuperar.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();

        resetarSenha(email);
      });
    }
  });

  window.googleID = googleID;
  window.githubAcess = githubAcess;
  window.loginGoogle = loginGoogle;
  window.loginEmailSenha = loginEmailSenha;