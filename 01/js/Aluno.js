export default class Aluno {
  #nome;
  #notas = [];

  constructor(nome, notas = []) {
    this.#nome = nome;
    this.#notas = notas;
  }

  // Método para adicionar uma nota individualmente
  adicionarNota(novaNota) {
    //prettier-ignore
    if ((novaNota >= 0) && (novaNota <= 10)) {
      this.#notas.push(novaNota);
    } else {
      alert('Nota inválida. Deve ser um número entre 0 e 10.');
    }
  }

  // Método privado para validar se as notas são válidas
  #validarNotas(notas) {
    let notasValidas = notas.every((nota) => {
      return nota >= 0 && nota <= 10;
    });

    if (notasValidas === false) {
      alert('Cada nota deve ser um número entre 0 e 10.');
      return false;
    }
    return true;
  }

  // Getters e Setters para notas
  get notas() {
    return this.#notas;
  }

  get nome() {
    return this.#nome;
  }

  set notas(notas) {
    if (this.#validarNotas(notas)) {
      this.#notas = notas;
    }
  }

  // Método para calcular a média simples
  calcularMedia() {
    if (!this.#validarNotas(this.#notas)) {
      return 0; // Não pode calcular a média se as notas não forem válidas
    }

    if (this.#notas.length === 0) {
      alert('Divisão por zero não é aceita!');
      return 0;
    } else {
      let resultado;
      //prettier-ignore
      let soma = this.#notas.reduce((acumulador, notaAtual) => {
        return acumulador + notaAtual; // Soma o valor atual ao acumulador
      }, 0);
      resultado = soma / this.#notas.length;
      return resultado.toFixed(2);
    }
  }

  // Método para exibir informações
  toString() {
    return `${this.#nome}, Notas: ${this.#notas.join(', ')}`;
  }
}
