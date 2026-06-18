const datas = document.querySelector(".data")
const hora = document.querySelector(".h")
const min = document.querySelector(".m")
const sec = document.querySelector(".s")

const btn_cron = document.querySelector(".btn-crn")
const btn_pomd = document.querySelector(".btn-pmd")

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date()

    datas.textContent = now.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    })
})

function atualizarHora() {
    const now = new Date()
    let hr = now.getHours()
    let mn = now.getMinutes()
    let sc = now.getSeconds()

    if (hr < 10) {
        hr = "0" + now.getHours() 
    } else if (mn < 10) {
        mn = "0" +  now.getMinutes()
    } else if (sc < 10) {
        sc = "0" +  now.getSeconds()
    }

    hora.textContent = String(hr).padStart(2, "0")
    min.textContent = String(mn).padStart(2, "0")
    sec.textContent = String(sc).padStart(2, "0")
}

atualizarHora() 

setInterval(atualizarHora, 1000)

btn_cron.addEventListener("click", () => {
    window.location.href = "../cronometro/index.html";
})

btn_pomd.addEventListener("click", () => {
    window.location.href = "../pomodoro/index.html";
})
