const textArea = document.querySelector("#textareaFrom")
const btnGravar = document.querySelector("#btnGravar")
const btnParar = document.querySelector("#btnParar")
const btnBaixar = document.querySelector("#btnBaixar")
const btnLimpar = document.querySelector("#btnLimpar")

class speechApi {

  constructor() {

    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition

    this.speechApi = new SpeechToText()
    this.output = textArea.output
    this.speechApi.continuous = true
    this.speechApi.lang = "pt-BR"

    this.speechApi.onresult = (e) => {
      var resultIndex = e.resultIndex
      var transcript = e.results[resultIndex][0].transcript

      textArea.value += transcript
      
    }
  }

  start() {
    this.speechApi.start()
  }

  stop() {
    this.speechApi.stop()
  }
}

var speech = new speechApi()

btnGravar.addEventListener("click", e => {
  btnGravar.disabled = true
  btnParar.disabled = false
  speech.start()
})

btnParar.addEventListener("click", () => {
  btnGravar.disabled = false
  btnParar.disabled = true
  speech.stop()
})

btnBaixar.addEventListener('click', () => {
  var text = textArea.value
  var filename = "speech.txt"

  download(text, filename)
})

function download(text, filename) {
  var element = document.createElement('a')

  element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))

  element.setAttribute('download', filename)

  element.style.display = 'none'

  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

btnLimpar.addEventListener("click", () => {
  textArea.value = ""
  btnGravar.disabled = false
  btnParar.disabled = true
  speech.stop()
})
