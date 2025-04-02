// Definindo a classe Retangulo
export class Retangulo {
  // Atributos privado para armazenar largura e altura
  #largura;
  #altura;
  // Construtor da classe.
  constructor(largura, altura) {
    this.#largura = largura;
    this.#altura = altura;
  }

  // Métodos getters para obter os conteúdos de largura e altura
  get largura() {
    return this.#largura;
  }

  get altura() {
    return this.#altura;
  }

  // Métodos setters para definir os conteúdos de largura e altura
  set largura(largura) {
    if (largura > 0) {
      this.#largura = largura;
    } else {
      alert('A largura deve receber um valor positivo e maior que zero!');
    }
  }

  set altura(altura) {
    if (altura > 0) {
      this.#altura = altura;
    } else {
      alert('A altura deve receber um valor positivo e maior que zero!');
    }
  }

  // Método para calcular a área do retângulo
  calcularArea() {
    return this.#largura * this.#altura;
  }

  // Retorna uma string que representa um objeto
  toString() {
    return `Retângulo { altura: ${this.#altura}, largura: ${this.#largura}}`;
  }
}
