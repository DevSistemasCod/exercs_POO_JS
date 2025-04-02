// Importando a classe Retangulo
import Retangulo from './Retangulo.js';

// Definindo a classe Principal
export class Principal {
  constructor() {
    // Seleciona os elementos da interface do usuário
    this.larguraInput = document.getElementById('larguraInput');
    this.alturaInput = document.getElementById('alturaInput');
    this.botaoCalcular = document.getElementById('botaoCalcular');
    this.resultado = document.getElementById('resultado');

    // Adiciona um evento de clique ao botão
    if (this.botaoCalcular instanceof HTMLButtonElement) {
      this.botaoCalcular.addEventListener('click', () => {
        this.calcularAreaRetangulo();
      });
    }
  }

  calcularAreaRetangulo() {
    // Obtém os valores dos campos de entrada
    // prettier-ignore
    if((this.larguraInput instanceof HTMLInputElement) && (this.alturaInput instanceof HTMLInputElement)){
        let largura = parseFloat(this.larguraInput.value);
        let altura = parseFloat(this.alturaInput.value);

        // Valida os valores fornecidos
        // prettier-ignore        
        if (isNaN(largura) || isNaN(altura) || (largura <= 0) || (altura <= 0)) {
            alert("Ambos os valores devem ser positivos superiores a Zero !")
            return;
        }else{
            // Cria uma instância da classe Retangulo
            let retangulo = new Retangulo(largura, altura);
            let area = retangulo.calcularArea();
            if(this.resultado instanceof HTMLParagraphElement){
                this.resultado.textContent = `A área do retângulo é: ${area}`;
            }
            this.larguraInput.value = '';
            this.alturaInput .value = '';
        }  
  
    }
  }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new Principal();
});
