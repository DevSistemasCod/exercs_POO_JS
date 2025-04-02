import Aluno from './Aluno.js';

class GerenciadorDeAlunos {
  constructor() {
    this.aluno = null;
    this.#configurar();
  }

  /* static inicializar() {
    new GerenciadorDeAlunos();
  } */

  #configurar() {
    let notaInput = document.getElementById('nota');
    let adicionarNotaBtn = document.getElementById('adicionarNotaBtn');
    let calcularMediaBtn = document.getElementById('calcularMediaBtn');
    let limparConteudoBtn = document.getElementById('limparConteudoBtn');

    //prettier-ignore
    if((notaInput instanceof HTMLInputElement) && (adicionarNotaBtn instanceof HTMLButtonElement) &&
      (calcularMediaBtn instanceof HTMLButtonElement) && (limparConteudoBtn instanceof HTMLButtonElement)) 
    {
      adicionarNotaBtn.addEventListener('click', () => {
        this.acrescentarNota(notaInput);
      });

      calcularMediaBtn.addEventListener('click', () => {
        this.exibirMedia();
      });

      limparConteudoBtn.addEventListener('click', () => {
        this.limparConteudo();
      });
    }
  }

  // Método para obter o nome do aluno
  obterNome() {
    let nomeInput = document.getElementById('nome');

    if (nomeInput instanceof HTMLInputElement) {
      return nomeInput.value;
    }
    return '';
  }

  inicializarAluno() {
    let nome = this.obterNome();

    //if (nome === '' || nome === undefined || nome === null){
    //simplificação
    if (!nome) {
      alert('Por favor, insira o nome do aluno.');
      return false;
    }
    //if (this.aluno === undefined || this.aluno === null){
    //simplificação
    if (!this.aluno) {
      this.aluno = new Aluno(nome);
    } else {
      // Atualiza o nome do aluno existente
      this.aluno = new Aluno(nome, this.aluno.notas);
    }
    return true;
  }

  acrescentarNota(notaInput) {
    //if (alunoInicializado === false) {
    //simplificação
    //prettier-ignore
    if (!this.inicializarAluno()) 
      return;

    let nota = Number(notaInput.value);
    //prettier-ignore
    if ((!isNaN(nota)) && (nota >= 0) && (nota <= 10)) {
      this.aluno.adicionarNota(nota); 
      notaInput.value = ''; 
      this.exibirNotas();
    } else {
      alert('Digite uma nota válida entre 0 e 10.');
    }
  }

  exibirMedia() {
    let resultado = document.getElementById('resultado');

    if (!this.aluno) {
      alert('Nenhum aluno foi inicializado.');
      return;
    }
    if (resultado instanceof HTMLParagraphElement) {
      let media = Number(this.aluno.calcularMedia());
      resultado.textContent = `Aluno: ${this.aluno.nome}, Média: ${media}`;
    }
  }

  exibirNotas() {
    let notasAdicionadas = document.getElementById('notasAdicionadas');

    if (!this.aluno) {
      alert('Nenhum aluno foi inicializado.');
      return;
    }
    if (notasAdicionadas instanceof HTMLParagraphElement) {
      //prettier-ignore
      notasAdicionadas.textContent = `Notas adicionadas: ${this.aluno.notas.join(', ')}`;
    }
  }

  // Método para limpar conteúdo
  limparConteudo() {
    let notasAdicionadas = document.getElementById('notasAdicionadas');
    let resultado = document.getElementById('resultado');
    let nomeInput = document.getElementById('nome');

    //prettier-ignore
    if ((notasAdicionadas instanceof HTMLParagraphElement) && (resultado instanceof HTMLParagraphElement) && (nomeInput instanceof HTMLInputElement)) {
      notasAdicionadas.textContent = '';
      resultado.textContent = '';
      nomeInput.value = '';
    }
    this.aluno = null;
  }
}

// Inicializar o Gerenciador ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  new GerenciadorDeAlunos();
});

/* document.addEventListener('DOMContentLoaded', () => {
  GerenciadorDeAlunos.inicializar();
}); */
