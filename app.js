//Desafio: Sorteador de amigo secreto!
//Objetivo: Desenvolver uma lógica para armazenar uma lista de amigos e sortear um aleatoriamente.
// ===================================

// Lista para armazenar os nomes dos amigos
let amigos = [];
// Lista para armazenar os números já sorteados
let numeros = [];

// Função para adicionar um amigo à lista de amigos
function adicionarAmigo() {
    let amigo = document.querySelector('#amigo').value;
    if (amigo.trim() === "") {
        alert('Por favor, insira um nome.');
    } else {
        amigos.push(amigo);
        listaDeAmigos();
        document.querySelector('#amigo').value = "";
    }
}

// Função para exibir a lista de amigos no elemento HTML
function listaDeAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = "";
    amigos.forEach((amigo) => {
        let novoItem = document.createElement('li');
        novoItem.textContent = amigo;
        lista.appendChild(novoItem);
    });
}

// Função para sortear um amigo da lista
function sortearAmigo() {
    if (amigos.length === 0) {
        alert('Por favor, insira um nome para sorteio.');
        return;
    }

    let numero = gerarNumeroAleatorio();
    if (numero !== 'limite') {
        mostrarSorteado(numero);
        ativarNovoJogo(); // Ativa o botão "Novo Jogo" após o primeiro sorteio
    }
}

// Função para gerar um número aleatório único
function gerarNumeroAleatorio() {
    if (numeros.length === amigos.length) {
        alert('Todos foram sorteados.');
        return 'limite';
    }

    let numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * amigos.length);
    } while (numeros.includes(numeroAleatorio));

    numeros.push(numeroAleatorio);
    return numeroAleatorio;
}

// Função para exibir o amigo sorteado e ocultar o nome após um tempo
function mostrarSorteado(numero) {
    document.getElementById('botaosorteio').setAttribute('disabled', true);
    let sorteado = document.getElementById('resultado');
    sorteado.innerHTML = `<li>${amigos[numero]}</li><p>Memorize o nome sorteado, ele irá sumir em <span id="contador">10</span> segundos.</p>`;

    let contador = 10;
    let intervalo = setInterval(() => {
        contador--;
        document.getElementById('contador').textContent = contador;

        if (contador <= 0) {
            clearInterval(intervalo);
            sorteado.innerHTML = "";
            document.getElementById('botaosorteio').removeAttribute('disabled');
        }
    }, 1000);
}

// Função para ativar o botão "Novo Jogo"
function ativarNovoJogo() {
    const botaoNovoJogo = document.getElementById('botaonovojogo');
    botaoNovoJogo.removeAttribute('disabled');
}

// Função para reiniciar o jogo
function novoJogo() {
    amigos = [];
    numeros = [];
    document.getElementById('listaAmigos').innerHTML = "";
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('botaosorteio').removeAttribute('disabled');
    document.getElementById('botaonovojogo').setAttribute('disabled', true);
    alert('Jogo reiniciado! Adicione novos amigos para começar.');
}

