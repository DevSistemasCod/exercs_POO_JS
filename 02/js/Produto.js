export default class Produto {
  #nome;
  #quantidade;
  #preco;

  constructor(nome, quantidade, preco) {
    this.#nome = nome;
    this.#quantidade = quantidade;
    this.#preco = preco;
  }

  valorTotal() {
    return (this.#quantidade * this.#preco).toFixed(2);
  }

  //prettier-ignore
  toString() {
    return `Nome: ${this.#nome}, Quantidade ${this.#quantidade}, 
    Preço Unitário: R$ ${this.#preco}, Valor Total: R$ ${this.valorTotal()}`;
  }
}
