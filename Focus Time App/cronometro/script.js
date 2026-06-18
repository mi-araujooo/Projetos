const btn_voltar = document.querySelector(".btn-voltar")
const btn_iniciar = document.querySelector(".btn-iniciar")
const btn_zerar = document.querySelector(".btn-zerar")
const hora = document.querySelector(".h")
const min = document.querySelector(".m")
const sec = document.querySelector(".s")

btn_voltar.addEventListener("click", () => {
    window.location.href = "../relogio/index.html";
})

let intervalo = null
let inicio = false

btn_iniciar.addEventListener("click", () => {

    if (!inicio) {
        inicio = true
        btn_iniciar.textContent = "PAUSAR"
        intervalo = setInterval(atualizarHora, 1000)
    } else {
        inicio = false
        btn_iniciar.textContent = "INICIAR"
        clearInterval(intervalo)
        intervalo = null
    }
})

btn_zerar.addEventListener("click", () => {
    btn_iniciar.textContent = "INICIAR"
    clearInterval(intervalo)
    intervalo = null
    zerarHora()
})


let hr = 0
let mn = 0
let sc = 0

function atualizarHora() {
    sc++

    if (sc >= 60) {
        sc = 0
        mn++
    }

    if (mn >= 60) {
        mn = 0
        hr++
    }

    hora.textContent = String(hr).padStart(2, "0")
    min.textContent = String(mn).padStart(2,"0")
    sec.textContent = String(sc).padStart(2,"0")
}

function zerarHora() {
    hr = 0
    mn = 0
    sc = 0

    hora.textContent = "00"
    min.textContent = "00"
    sec.textContent = "00"
}