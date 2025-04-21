export default class Pedido {
  #nome;
  #quantidade;
  #preco;

  constructor(nome, quantidade, preco) {
    this.#nome = nome;
    this.#quantidade = quantidade;
    this.#preco = preco;
  }

  get nome() {
    return this.#nome;
  }

  get quantidade() {
    return this.#quantidade;
  }

  get preco() {
    return this.#preco;
  }

  valorTotal() {
    return (this.#quantidade * this.#preco).toFixed(2);
  }
}
