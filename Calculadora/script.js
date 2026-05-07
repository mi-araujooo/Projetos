const numeros = document.querySelectorAll(".numeros")
const operadores = document.querySelectorAll(".operador")
const funcoes = document.querySelectorAll(".funcoes")

const visor = document.querySelector(".visor")
const igual = document.querySelector(".igual")

const pop = document.querySelector(".pop-up")

let num1 = 0
let num2 = 0
let resultado = 0

let texto_visor = ""

let atual = ""
let anterior = ""
let operador = ""

let memoria = null
let gt = 0

const operacoes = {
    "+": soma,
    "-": subtracao,
    "x": multiplicacao,
    "÷": divisao,
    "%": porcentagem,
    "^": potencia
}


/*funções de atualização do visor*/
function visorAtualiza() {
    const numero = Number(texto_visor)

    if (texto_visor !== "ERRO") {
        if (String(texto_visor).length <= 5) {
            visor.textContent = texto_visor
        } else {
            if (numero < 0.001) {
                let valor_formatado = numero.toExponential(2)
                visor.textContent = String(valor_formatado)
            } else {
                if (!Number.isInteger(numero)) {
                    let valor_formatado = numero.toFixed(4)
                    visor.textContent = String(valor_formatado)
                } else {
                    let valor_formatado = numero.toExponential(2)
                    visor.textContent = String(valor_formatado)
                }
            }

        }
    } else {
        visor.textContent = texto_visor
    }

}



/*atualização do visor*/
numeros.forEach(botao => {
    botao.addEventListener("click", () => {
        if (texto_visor === "ERRO") {
            anterior = ""
            operador = ""
            atual = ""
            texto_visor = ""
        }

        if (botao.dataset.valor === "." && atual.includes(".")) {
            novoPop("Você já adicionou virgula no número atual")
            return
        }

        if (botao.dataset.valor === "." && atual === "") {
            atual = "0."
            texto_visor = atual
            visorAtualiza()
            return
        }

        atual += botao.dataset.valor
        texto_visor = atual
        visorAtualiza()

    });
});




/*controle operações*/
operadores.forEach(botao => {
    botao.addEventListener("click", () => {
        if (atual === "" && anterior === "") {
            novoErro()
            return
        } else if (atual === "" && anterior !== "") {
            operador = botao.dataset.valor
            texto_visor = operador
            visorAtualiza()
        } else {
            if (operador === "") {
                operador = botao.dataset.valor
                anterior = atual
                atual = ""
                texto_visor = operador
                visorAtualiza()
            } else {
                resultado = operacoes[operador](Number(anterior), Number(atual))
                if (isNaN(resultado)) {
                    novoErro()
                } else {
                    anterior = resultado
                    operador = botao.dataset.valor
                    atual = ""
                    texto_visor = operador
                    visorAtualiza()
                }
            }
        }

    })
});



/*funções calculadora*/
funcoes.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.dataset.valor === "ac") {
            texto_visor = "0"
            atual = ""
            anterior = ""
            operador = ""
            visorAtualiza()
        } else if (botao.dataset.valor === "+/-") {
            if (atual === "") {
                novoPop("Não há nenhum número atualmente")
            } else {
                atual = String(Number(atual) * -1)
                texto_visor = atual
                visorAtualiza()
            }
        } else if (botao.dataset.valor === "mmais") {
            let valor = Number(texto_visor)
            if (!isNaN(valor)) {
                if (memoria === null) {
                    memoria = valor 
                } else {
                    memoria += valor
                }
                novoPop("Memória atualizada com o valor atual")
            } else {
                novoPop("Impossivel atualizar memória")
            }
        } else if (botao.dataset.valor === "mmenos") {
            let valor = Number(texto_visor)
            if (!isNaN(valor)) {
                if (memoria === null) {
                    memoria = -valor
                } else {
                    memoria -= valor  // subtrai normalmente
                }
                novoPop("Memória atualizada retirando o valor atual")
            } else {
                novoPop("Impossivel atualizar memória")
            }
        } else if (botao.dataset.valor === "mr") {
            if (memoria === null) {
                novoPop("A memória está atualmente vazia")
            } else {
                atual = String(memoria)
                anterior = ""
                texto_visor = atual
                visorAtualiza()
                novoPop("Memória recuperada com sucesso")
            }
        } else if (botao.dataset.valor === "gt") {
            texto_visor = String(gt)
            gt = 0
            novoPop("GT recuperado com sucesso. Atualmente está zerado")
            visorAtualiza()
        }
    });

});


/*resultados*/
igual.addEventListener("click", () => {
    if (operador === "" || atual === "") {
        novoErro()
    } else {
        resultado = operacoes[operador](Number(anterior), Number(atual))
        if (isNaN(resultado)) {
            gt = 0
            novoErro()
        } else {
            gt += Number(resultado)

            anterior = resultado
            texto_visor = String(resultado)
            visorAtualiza();
            operador = ""
            atual = ""
        }
    }
})



/*funções operação*/
function soma(a, b) {
    return a + b
}

function subtracao(a, b) {
    return a - b
}

function multiplicacao(a, b) {
    return a * b
}

function divisao(a, b) {
    if (b === 0) {
        return NaN
    }
    return a / b
}

function porcentagem(a, b) {
    return (a * b / 100)
}

function potencia(a, b) {
    return a ** b
}

function novoPop(args) {
    pop.textContent = args
    pop.classList.add("show")
    setTimeout(() => {
        pop.classList.remove("show")
    }, 3000);
}

function novoErro() {
    texto_visor = "ERRO"
    anterior = ""
    operador = ""
    atual = ""
    visorAtualiza()
}