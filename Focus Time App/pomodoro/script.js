const min = document.querySelector(".m")
const sec = document.querySelector(".s")

const btn_iniciar = document.querySelector(".btn-iniciar")
const btn_cron = document.querySelector(".btn-crn")
const btn_rel = document.querySelector(".btn-rel")

const modo_tt = document.querySelector(".modo-tt")
const btn_modo = document.querySelector(".btn-mod")
const text_modo = document.querySelector(".texto-modo")

let intervalo = null
let inicio = false
let modo = "foco";
let ciclos = 0;

let m = 25;
let s = 0;

btn_cron.addEventListener("click", () => {
    window.location.href = "../cronometro/index.html";
})

btn_rel.addEventListener("click", () => {
    window.location.href = "../relogio/index.html";
})

function atualizarTempo() {
    if (m === 0 && s === 0) {
        if (modo === "foco") {
            ciclos++;
            if (ciclos === 4) {
                modo = "pausaLonga";
                text_modo.textContent = "Modo Pausa Longa" 
                btn_modo.style.backgroundColor = "#ff38ff";
                m = 15;
                ciclos = 0;
            } else {
                modo = "pausaCurta";
                text_modo.textContent = "Modo Pausa Curta"
                btn_modo.style.backgroundColor = "#5cff5c";
                m = 5;
            }
            s = 0;
        } else {
            modo = "foco";
            text_modo.textContent = "Modo Foco"
            btn_modo.style.backgroundColor = "#00edff";
            m = 25;
            s = 0;
        }

        inicio = false
        btn_iniciar.textContent = "INICIAR"
                btn_iniciar.innerHTML = `
            <i class="fa-solid fa-play"></i>
            INICIAR
        `;
        clearInterval(intervalo)
        intervalo = null

    } else if (s === 0) {
        m--;
        s = 59;
    } else {
        s--;
    }
    min.textContent = String(m).padStart(2, "0");
    sec.textContent = String(s).padStart(2, "0");
}

btn_iniciar.addEventListener("click", () => {

    if (!inicio) {
        inicio = true
        btn_iniciar.textContent = "PAUSAR"
        btn_iniciar.innerHTML = `
            <i class="fa-solid fa-pause"></i>
            PAUSAR
        `;
        intervalo = setInterval(atualizarTempo, 1000)

    } else {
        inicio = false
        btn_iniciar.textContent = "INICIAR"
        btn_iniciar.innerHTML = `
            <i class="fa-solid fa-play"></i>
            INICIAR
        `;
        clearInterval(intervalo)
        intervalo = null
    }
})
