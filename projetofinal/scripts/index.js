"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const elemento = document.querySelector(".listar-receitas");
const botaoPesquisar = document.querySelector("#botao-pesquisar");
const pesquisaInput = document.querySelector("#input-pesquisar");
//O método split() divide uma String em uma lista ordenada de substrings, coloca essas substrings em um array e retorna o array
function arrayFiltro(arrayIngredientes) {
    return arrayIngredientes.split(","); //vírgula é o parâmetro de divisão do array
}
function getReceitas() {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield fetch("https://receitas-server.vercel.app/api");
        const data = yield request.json();
        // console.log(data);
        return data;
    });
}
// O método toLowerCase() converte uma string em letras minúsculas sem alterar a string original.
// async function filtroIngredientes(ingrediente: string){
//   const ingredienteFiltrado = await getReceitas();
//   const filtro = ingredienteFiltrado.filter(dados => {
//     const ingredientes = dados.Ingredients.filter(ingredientes => {
//       return ingredientes.toLowerCase().includes(ingrediente.toLowerCase()); 
//     });
//     if(ingredientes.length){
//       return dados;
//     }
//   })
//   // cardsReceita(filtro);
//   console.log(filtro);
// }
function filtroIngredientes(event, ingrediente) {
    return __awaiter(this, void 0, void 0, function* () {
        const ingredienteFiltrado = yield getReceitas();
        const filtro = ingredienteFiltrado.filter(dados => {
            const variosIngredientes = arrayFiltro(ingrediente).length > 1;
            if (!variosIngredientes) {
                const incluiIngredientes = dados.Ingredients.filter((ingredientesFiltrados) => {
                    return ingredientesFiltrados.toLowerCase().includes(ingrediente.toLowerCase());
                });
                return incluiIngredientes.length ? dados : false;
            }
            if (variosIngredientes) {
                let acumulador = [];
                const procuraValor = arrayFiltro(ingrediente);
                for (let i = 0; i < procuraValor.length; i++) {
                    for (let y = 0; y < dados.Ingredients.length; y++) {
                        if (dados.Ingredients[y].includes(procuraValor[i])) {
                            if (acumulador.includes(procuraValor[i])) {
                                return false;
                            }
                            acumulador.push(procuraValor[i]);
                        }
                    }
                }
                if (acumulador.length === procuraValor.length)
                    return true;
            }
        });
        cardsReceita(filtro);
        console.log(filtro);
    });
}
function cardsReceita(itens) {
    if (elemento) {
        elemento.innerHTML = "";
        var i = 0;
        itens.forEach((item) => {
            if (i > 14) {
                return false;
            }
            elemento.innerHTML +=
                `<div class="listar-itens">
        <div class="imagem"><img src="${item.urlImage}" alt="food-chef" <h5><a href="">${item.Name}</a></h5></div>
      </div>`;
            i++;
        });
    }
}
function pesquisa() {
    return __awaiter(this, void 0, void 0, function* () {
        const retorno = yield getReceitas();
        const pesquisarIngrediente = pesquisaInput.value;
        const valorIngrediente = retorno.filter((receita) => receita.Ingredients.includes(pesquisarIngrediente));
        cardsReceita(valorIngrediente);
    });
}
function eventListenerHandle() {
    var _a;
    (_a = botaoPesquisar) === null || _a === void 0 ? void 0 : _a.addEventListener("click", pesquisa);
}
// filtroIngredientes("chocolate, dark");
eventListenerHandle();
