import Pedido from './Pedidos.js';

// Vetor de pedidos
let pedidos = [];

// Configura os eventos dos botões
let configurarEventos = () => {
  let botaoAdicionar = document.getElementById('adicionarBtn');
  let botaoFinalizar = document.getElementById('finalizarBtn');

  //prettier-ignore
  if ((botaoAdicionar instanceof HTMLButtonElement) && (botaoFinalizar instanceof HTMLButtonElement)) {
    botaoAdicionar.addEventListener('click', adicionarVetor);
    botaoFinalizar.addEventListener('click', finalizarPedido);
  }
};

// Função para adicionar ao vetor
let adicionarVetor = () => {
  let itemInput = document.getElementById('item');
  let quantidadeInput = document.getElementById('quantidade');
  let precoInput = document.getElementById('preco');

  //prettier-ignore
  if ((itemInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement) &&
    (precoInput instanceof HTMLInputElement)) 
  {
    let nome = itemInput.value;
    let quantidade = parseInt(quantidadeInput.value);
    let preco = parseFloat(precoInput.value);

    //prettier-ignore
    if (!nome || (quantidade <= 0) || (preco <= 0)) {
      alert('Preencha os campos corretamente!');
      return;
    }

    let pedidoExistente = pedidos.find((pedido) => pedido.nome === nome);
    if (pedidoExistente) {
      //prettier-ignore
      alert('Este pedido já foi adicionado. Altere a quantidade ou remova o pedido para atualizá-lo.');
      return;
    }

    let novoPedido = new Pedido(nome, quantidade, preco);
    pedidos.push(novoPedido);

    limparCampos();
    atualizarConteudo();
  }
};

// Função para limpar os campos de entrada
let limparCampos = () => {
  let itemInput = document.getElementById('item');
  let quantidadeInput = document.getElementById('quantidade');
  let precoInput = document.getElementById('preco');

   //prettier-ignore
  if ((itemInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement) &&
    (precoInput instanceof HTMLInputElement)) 
  {
    itemInput.value = '';
    quantidadeInput.value = '';
    precoInput.value = '';
  }
};

// Função para finalizar o pedido
let finalizarPedido = () => {
  if (pedidos.length === 0) {
    alert('Adicione itens ao pedido antes de finalizar.');
    return;
  }

  alert('Pedido finalizado com sucesso!');
  pedidos = [];
  atualizarConteudo();
};

// Função para calcular o total com 10% de acréscimo
let calcularTotal = () => {
  //prettier-ignore
  let subtotal = pedidos.reduce((total, pedido) => total + pedido.quantidade * pedido.preco,0);
  return subtotal * 1.1;
};

// Atualiza a lista de itens no HTML
let atualizarConteudo = () => {
  let listaItens = document.getElementById('lista');
  let total = document.getElementById('total');

  //prettier-ignore
  if ((listaItens instanceof HTMLUListElement) && (total instanceof HTMLSpanElement)) 
  {
    // Limpa a lista atual
    while (listaItens.firstChild) {
      listaItens.removeChild(listaItens.firstChild);
    }

    // Adiciona os pedidos
    pedidos.forEach((pedido) => {
      let li = document.createElement('li');
      //prettier-ignore
      li.textContent = `${pedido.nome} - ${pedido.quantidade} x R$ ${pedido.preco.toFixed(2)}`;
      listaItens.appendChild(li);
    });

    // Atualiza o valor total com acréscimo
    total.textContent = calcularTotal().toFixed(2);
  }
};

// Inicializa após carregamento do DOM
document.addEventListener('DOMContentLoaded', configurarEventos);
