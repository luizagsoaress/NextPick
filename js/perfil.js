async function deletarConta() {
    const res = await fetch("https://api-nextpick.onrender.com/deletar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const data = await res.json();
    if(data.success) {
      toastr.sucesso(data.message);
      setTimeout(() => {
        window.location.href = "../index.html";
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

async function salvarFoto(foto) {
    const res = await fetch("https://api-nextpick.onrender.com/atualizarFoto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ foto }),
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
const avatarImg = document.querySelector('.avatar-img-selector');
  
if(avatares) {
  avatares.forEach(avatar => {
  	avatar.addEventListener('click', async () => {
    	let imgSrc = '';
    	if (avatar.classList.contains('avatar1')) {
      		imgSrc = "https://api.dicebear.com/9.x/rings/svg?seed=Vivian";
    	} else if (avatar.classList.contains('avatar2')) {
      		imgSrc = "https://api.dicebear.com/9.x/rings/svg?seed=Luis";
    	} else if (avatar.classList.contains('avatar3')) {
      		imgSrc = "https://api.dicebear.com/9.x/rings/svg?seed=Christopher";
    	} else if (avatar.classList.contains('avatar4')) {
      		imgSrc = "https://api.dicebear.com/9.x/rings/svg?seed=Caleb";
    	} else if (avatar.classList.contains('avatar5')) {
      		imgSrc = "https://api.dicebear.com/9.x/rings/svg?seed=Chase";
    	} else if (avatar.classList.contains('avatar6')) {
      		imgSrc = "https://api.dicebear.com/9.x/rings/svg?seed=Oliver";
    	}
    	await salvarFoto(imgSrc);
    	user.src = imgSrc;
    	avatarImg.src = imgSrc;
  	});
  });
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
      let firebaseError = data.error;
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
    
    const avatarMenuNome = document.querySelector('.avatar-menu');
    const inputEmail = document.querySelector('.input-email');
  
    if(email) inputEmail.placeholder = email;
	
	  if(!nomeUsuario && avatarMenuNome) {
    	avatarMenuNome.textContent = 'Usuario';
    } else if(nomeUsuario && avatarMenuNome) {
    	const primeiraLetra = nomeUsuario.slice(0, 2).toUpperCase();
    	avatarMenuNome.textContent = primeiraLetra;
    } 
    
    const avatarImg = document.querySelector('.avatar-img-selector');
    const user = document.querySelector('.avatar-img');

    if(avatarImg && fotoUrl && user) {
      user.src = fotoUrl;
    	avatarImg.src = fotoUrl;
    } else if(!fotoUrl) {
      avatarImg.src = 'https://api.dicebear.com/9.x/rings/svg?seed=Liam';
      user.src = 'https://api.dicebear.com/9.x/rings/svg?seed=Liam';
    }
}

document.addEventListener("DOMContentLoaded", async function() {
	  carregarDados();
});
