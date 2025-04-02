import Produto from './Produto.js';

class GerenciadorDeEstoque {
  #produtos = [];

  constructor() {
    this.configurar();
  }

  configurar() {
    let adicionarBtn = document.getElementById('adicionarBtn');
    let removerBtn = document.getElementById('removerBtn');

    //prettier-ignore
    if ((adicionarBtn instanceof HTMLButtonElement) && (removerBtn instanceof HTMLButtonElement)) {
      // Usamos .bind(this) no addEventListener para corrigir o escopo de this
      // Isso evita que this se refira ao botão em vez da instância da classe.
      // Assim o this.#produtos será acessado de forma correta.
      adicionarBtn.addEventListener('click', this.adicionarProduto.bind(this));
      removerBtn.addEventListener('click', this.removerProduto.bind(this));
    }
  }

  adicionarProduto() {
    let nomeInput = document.getElementById('nome');
    let quantidadeInput = document.getElementById('quantidade');
    let precoInput = document.getElementById('preco');

    //prettier-ignore
    if((nomeInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement)
        && (precoInput instanceof HTMLInputElement))
    {
      let nome = nomeInput.value;
      let quantidade = parseInt(quantidadeInput.value);
      let preco =  parseFloat(precoInput.value);

      
      /*  if ((nome.trim() === '') || (typeof quantidade !== 'number') || (isNaN(quantidade))
         || (typeof preco !== 'number') || (isNaN(preco))) {*/  
      //simplificação
      if (!nome || isNaN(quantidade) || isNaN(preco)) { 
      alert('Preencha todos os campos corretamente.');
        return;
      }
      //O método .find() é usado para buscar o primeiro item 
      // no array que satisfaz a condição fornecida.
      let produtoExistente = this.#produtos.find((p) => p.nome === nome);

    if (produtoExistente) {
      //produtoExistente.quantidade = produtoExistente.quantidade + quantidade;
      //simplificação
      produtoExistente.quantidade += quantidade;
    } else {
      this.#produtos.push(new Produto(nome, quantidade, preco));
    }

    this.atualizarLista();
    this.limparCampos();
    }
  }

  removerProduto() {
    let nomeInput = document.getElementById('nome');

    if (nomeInput instanceof HTMLInputElement) {
      let nome = nomeInput.value.trim();
      //if (!nome) {
      if (nome === '') {
        alert('Informe o nome do produto para remover.');
        return;
      }

      // No seu caso, findIndex é usado para localizar um objeto com base no atributo nome.
      // Isso não poderia ser feito com indexOf, pois indexOf
      // apenas verifica a igualdade direta de valores.
      let indice = this.#produtos.findIndex((p) => p.nome === nome);
      if (indice >= 0) {
        this.#produtos.splice(indice, 1);
        this.atualizarLista();
      } else {
        alert('Produto não encontrado.');
        return;
      }

      this.limparCampos();
    }
  }

  atualizarLista() {
    let estoqueLista = document.getElementById('estoqueLista');

    if (estoqueLista instanceof HTMLUListElement) {
      //estoqueLista.innerHTML = '';
      while (estoqueLista.firstChild) {
        estoqueLista.removeChild(estoqueLista.firstChild);
      }

      this.#produtos.forEach((produto) => {
        let li = document.createElement('li');
        li.textContent = produto.toString();
        estoqueLista.appendChild(li);
      });
    }
  }

  limparCampos() {
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
}

document.addEventListener('DOMContentLoaded', () => {
  new GerenciadorDeEstoque();
});
