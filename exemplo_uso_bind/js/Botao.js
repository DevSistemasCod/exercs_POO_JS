class Botao {
  #conteudoTexto;
  constructor() {
    this.configurar();
  }

  configurar() {
    let meuBotaoBtn = document.getElementById('meuBotaoBtn');
    if (meuBotaoBtn instanceof HTMLButtonElement) {
      meuBotaoBtn.addEventListener('click', this.clicar);
      //meuBotaoBtn.addEventListener('click', this.clicar.bind(this));
    }
  }

  clicar() {
    this.#conteudoTexto = 'Clicou no Botão !!!';
    let saida = document.getElementById('saida');
    if (saida instanceof HTMLParagraphElement) {
      saida.textContent = this.#conteudoTexto; // ERRO: `this` é o botão, não a classe
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  new Botao();
});
