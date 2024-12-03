// Seletores dos elementos
const textArea = document.querySelector("#textareaFrom"); // Campo de entrada
const outputArea = document.querySelector("#textareaTo"); // Campo de saída
const btnGravar = document.querySelector("#btnGravar"); // Botão Gravar
const btnParar = document.querySelector("#btnParar"); // Botão Parar
const btnBaixar = document.querySelector("#btnBaixar"); // Botão Baixar
const btnLimpar = document.querySelector("#btnLimpar"); // Botão Limpar

// Classe de reconhecimento de voz
class speechApi {
  constructor() {
    // Inicializa o reconhecimento de voz
    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.speechApi = new SpeechToText();
    this.speechApi.continuous = true; // Continuar ouvindo
    this.speechApi.lang = "pt-BR"; // Configurar idioma para português do Brasil

    // Evento disparado quando o reconhecimento recebe um resultado
    this.speechApi.onresult = (e) => {
      const resultIndex = e.resultIndex;
      const transcript = e.results[resultIndex][0].transcript;

      textArea.value += transcript; // Adiciona o texto reconhecido na área de entrada
    };
  }

  // Iniciar reconhecimento de voz
  start() {
    this.speechApi.start();
  }

  // Parar reconhecimento de voz
  stop() {
    this.speechApi.stop();
  }
}

// Instância da classe de reconhecimento de voz
const speech = new speechApi();

// Evento de clique no botão Gravar
btnGravar.addEventListener("click", () => {
  btnGravar.disabled = true; // Desabilita botão Gravar
  btnParar.disabled = false; // Habilita botão Parar
  speech.start(); // Inicia o reconhecimento de voz
});

// Evento de clique no botão Parar
btnParar.addEventListener("click", () => {
  btnGravar.disabled = false; // Habilita botão Gravar
  btnParar.disabled = true; // Desabilita botão Parar
  speech.stop(); // Para o reconhecimento de voz
});

// Evento de clique no botão Baixar
btnBaixar.addEventListener("click", () => {
  const inputText = textArea.value; // Texto da área de entrada
  const outputText = outputArea.value; // Texto da área de saída

  // Cria o conteúdo combinando os dois textos
  const combinedText = `Texto Original:\n${inputText}\n\nTradução:\n${outputText}`;
  const filename = "texto_e_traducao.txt"; // Nome do arquivo

  download(combinedText, filename); // Chama a função de download
});

// Função para fazer o download do texto como arquivo
function download(text, filename) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Evento de clique no botão Limpar
btnLimpar.addEventListener("click", () => {
  textArea.value = ""; // Limpa o campo de entrada
  outputArea.value = ""; // Limpa o campo de saída
  outputArea.placeholder = "Tradução"; // Redefine o placeholder do campo de saída
  btnGravar.disabled = false; // Habilita o botão Gravar
  btnParar.disabled = true; // Desabilita o botão Parar
  speech.stop(); // Garante que o reconhecimento de voz pare
});
