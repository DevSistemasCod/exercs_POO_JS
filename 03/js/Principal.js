import Pedido from './Pedidos.js';

class Principal {
  #pedidos = [];

  constructor() {
    this.configurar();
  }

  configurar() {
    let botaoAdicionar = document.getElementById('adicionarBtn');
    let botaoFinalizar = document.getElementById('finalizarBtn');

    //prettier-ignore
    if((botaoAdicionar instanceof HTMLButtonElement) && (botaoFinalizar instanceof HTMLButtonElement)){
      botaoAdicionar.addEventListener('click', this.adicionarPedido.bind(this));
      botaoFinalizar.addEventListener('click', this.finalizarPedido.bind(this));
    }
  }

  adicionarPedido() {
    let itemInput = document.getElementById('item');
    let quantidadeInput = document.getElementById('quantidade');
    let precoInput = document.getElementById('preco');

    //prettier-ignore
    if((itemInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement)
      && (precoInput instanceof HTMLInputElement))
    {
      let nome = itemInput.value;
      let quantidade = parseInt(quantidadeInput.value);
      let preco = parseFloat(precoInput.value);

      //prettier-ignore
      if ((!nome) || (quantidade <= 0) || (preco <= 0)) {
        alert('Preencha os campos corretamente!');
        return;
      }
      
      //Verifica se já existe um pedido na lista com o mesmo nome fornecido 
      // e retorna esse pedido, ou undefined se não encontrar.
      let pedidoExistente = this.#pedidos.find((itemPedido) => itemPedido.nome === nome);

      if (pedidoExistente) {
        //prettier-ignore
        alert('Este um pedido já foi adicionado. Altere a quantidade ou remova o pedido para atualizá-lo.');
        return;
      } 
      else {
        let pedido = new Pedido( nome, quantidade, preco);
        this.#pedidos.push(pedido);
      }
    
      this.atualizarConteudo();
      this.limparCampos();
    }
  }

  limparCampos() {
    let itemInput = document.getElementById('item');
    let quantidadeInput = document.getElementById('quantidade');
    let precoInput = document.getElementById('preco');

    //prettier-ignore
    if((itemInput instanceof HTMLInputElement) && (quantidadeInput instanceof HTMLInputElement)
     && (precoInput instanceof HTMLInputElement)){
        itemInput.value = '';
        quantidadeInput.value = '';
        precoInput.value = '';
    }
  }

  finalizarPedido() {
    if (this.#pedidos.length === 0) {
      alert('Adicione itens ao pedido antes de finalizar.');
      return;
    }
    alert('Pedido finalizado com sucesso!');
    this.#pedidos = [];
    this.atualizarConteudo();
  }

  atualizarConteudo() {
    let listaItens = document.getElementById('lista');
    let total = document.getElementById('total');

    //prettier-ignore
    if((listaItens instanceof HTMLUListElement) && (total instanceof HTMLSpanElement)){
      
      //listaItens.innerHTML = '';
      while (listaItens.firstChild) {
        listaItens.removeChild(listaItens.firstChild);
      }
      this.#pedidos.forEach((pedido) => {
        let li = document.createElement('li');
        //prettier-ignore
        li.textContent = `${pedido.nome} - ${pedido.quantidade} x R$${pedido.preco.toFixed(2)}`;
        listaItens.appendChild(li);
      });

      total.textContent = String(this.calcularTotal().toFixed(2));
    }
  }

  calcularTotal() {
    //prettier-ignore
    // reduce() é usado para "reduzir" um array a um único valor.
    // percorre o array e acumula um resultado com base em uma função.
    let total = this.#pedidos.reduce((total, pedido) => total + pedido.quantidade * pedido.preco ,0);
    return total * 1.10;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Principal();
});
