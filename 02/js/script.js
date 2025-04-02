import Produto from './Produto.js';

let produtos = [];

function configurar() {
  const adicionarBtn = document.getElementById('adicionarBtn');
  const removerBtn = document.getElementById('removerBtn');

  if (adicionarBtn && removerBtn) {
    adicionarBtn.addEventListener('click', adicionarProduto);
    removerBtn.addEventListener('click', removerProduto);
  }
}

function adicionarProduto() {
  let nomeInput = document.getElementById('nome');
  let quantidadeInput = document.getElementById('quantidade');
  let precoInput = document.getElementById('preco');
  //prettier-ignore
  if((nomeInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement)
        && (precoInput instanceof HTMLInputElement))
    {
      let nome = nomeInput.value.trim();
      let quantidade = parseInt(quantidadeInput.value);
      let preco =  parseFloat(precoInput.value);

      //if (!nome || isNaN(quantidade) || isNaN(preco)) {
       if ((nome.trim() === '') || (typeof quantidade !== 'number') || (isNaN(quantidade))
         || (typeof preco !== 'number') || (isNaN(preco))) 
       { 
        alert('Preencha todos os campos corretamente.');
        return;
      }
      //O método .find() é usado para buscar o primeiro item 
      // no array que satisfaz a condição fornecida.
      let produtoExistente = produtos.find((p) => p.nome === nome);

    if (produtoExistente) {
      //produtoExistente.quantidade += quantidade;
      produtoExistente.quantidade = produtoExistente.quantidade + quantidade;
    } else {
      produtos.push(new Produto(nome, quantidade, preco));
    }

    atualizarLista();
    limparCampos();
    }
}

function removerProduto() {
  let nomeInput = document.getElementById('nome');

  if (nomeInput instanceof HTMLInputElement) {
    let nome = nomeInput.value.trim();
    //if (!nome) {
    if (nome === '') {
      alert('Informe o nome do produto para remover.');
      return;
    }

    const indice = produtos.findIndex((p) => p.nome === nome);
    if (indice >= 0) {
      produtos.splice(indice, 1);
      atualizarLista();
    } else {
      alert('Produto não encontrado.');
    }

    limparCampos();
  }
}

function atualizarLista() {
  let estoqueLista = document.getElementById('estoqueLista');

  if (estoqueLista instanceof HTMLUListElement) {
    //estoqueLista.innerHTML = '';
    while (estoqueLista.firstChild) {
      estoqueLista.removeChild(estoqueLista.firstChild);
    }

    produtos.forEach((produto) => {
      let li = document.createElement('li');
      li.textContent = produto.toString();
      estoqueLista.appendChild(li);
    });
  }
}

function limparCampos() {
  let nomeInput = document.getElementById('nome');
  let quantidadeInput = document.getElementById('quantidade');
  let precoInput = document.getElementById('preco');

  //prettier-ignore
  if((nomeInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement)
     && (precoInput instanceof HTMLInputElement)){
        nomeInput.value = '';
        quantidadeInput.value = '';
        precoInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', configurar);
