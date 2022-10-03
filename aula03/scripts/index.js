"use strict";
// Façam o front de uma loja online.
// O sistema deve:
// -Listar os itens da loja
// -Permitir filtrar os itens por:  tamanho, coreS, preço, categoria
// Usem um design inventado por vocês ou que acharem pela internet, façam um CSS bacana porque a interface vai contar peso para avaliação.
// O trabalho deve ser entregue na quarta feira até as 00:00.
const blusas = [
    { id: 1, marca: "Calvin Klein.", modelo: "Calça Jeans", preco: 185.50, cor: "jeans", tamanho: "P", imagem: "./imagens/roupa1.jpg" },
    { id: 2, marca: "Malwee", modelo: "Blusa Manga Longa", preco: 35.00, cor: "preta", tamanho: "M", imagem: "./imagens/roupa2.webp" },
    { id: 3, marca: "Malwee", modelo: "Casaco", preco: 120.5, cor: "xadrez", tamanho: "M", imagem: "./imagens/roupa3.webp" },
    { id: 4, marca: "puma", modelo: "Biquini", preco: 98.00, cor: "preto", tamanho: "G", imagem: "./imagens/roupa4.jpg" },
    { id: 5, marca: "puma", modelo: "Sueter", preco: 110.99, cor: "marrom", tamanho: "P", imagem: "./imagens/roupa5.webp" },
    { id: 6, marca: "pia", modelo: "blusa do boruto", preco: 1.99, cor: "rosa", tamanho: "G", imagem: "./imagens/roupa1.jpg" },
    { id: 7, marca: "cavalera", modelo: "blusa do cavalo de fogo", preco: 1.99, cor: "verde", tamanho: "P", imagem: "./imagens/roupa1.jpg" },
    { id: 8, marca: "reserva", modelo: "blusa do cavalo de fogo azul", preco: 1.99, cor: "azul", tamanho: "M", imagem: "./imagens/roupa1.jpg" },
];
const blusasDesconto = [
    { id: 9, marca: "Calvin Klein.", modelo: "Calça Jeans", preco: 185.50, cor: "jeans", tamanho: "40", imagem: "./imagens/roupa2.webp" },
    { id: 10, marca: "lafrente", modelo: "blusa do one piece", preco: 7.0, cor: "azul", tamanho: "M", imagem: "./imagens/roupa2.webp" },
    { id: 11, marca: "ardidas", modelo: "blusa do tokyo ghoul", preco: 12.5, cor: "vermelha", tamanho: "G", imagem: "./imagens/roupa3.webp" },
    { id: 12, marca: "puma", modelo: "blusa do jujutsu no kaizen", preco: 1.99, cor: "rosa", tamanho: "P", imagem: "./imagens/roupa2.webp" },
    { id: 13, marca: "calvo cleide", modelo: "blusa do kimetsu no yaiba", preco: 1.99, cor: "amarela", tamanho: "M", imagem: "./imagens/roupa2.webp" },
    { id: 14, marca: "pia", modelo: "blusa do boruto", preco: 1.99, cor: "rosa", tamanho: "G", imagem: "./imagens/roupa2.webp" },
    { id: 15, marca: "cavalera", modelo: "blusa do cavalo de fogo", preco: 1.99, cor: "verde", tamanho: "P", imagem: "./imagens/roupa2.webp" },
    { id: 16, marca: "reserva", modelo: "blusa do cavalo de fogo azul", preco: 1.99, cor: "azul", tamanho: "M", imagem: "./imagens/roupa2.webp" },
];
const rootElement = document.querySelector("#root");
const roootElement = document.querySelector("#rooot");
const searchButtonElement = document.querySelector("#search-button");
const botaoVoltar = document.querySelector("#botao-voltar");
const botaoAtendimento = document.querySelector("#botao-atendimento");
const searchInputElement = document.querySelector("#input-pesquisar");
const searchTypeElement = document.querySelector("#filter-type-select");
function render(itens) {
    if (rootElement) {
        rootElement.innerHTML = "";
        itens.forEach((item) => {
            rootElement.innerHTML += `
      <div> 
        <a Key="${item.id}" href="./detalhes.html">
          '<div class="item-wrapper">
            '<img src="${item.imagem}" alt="">
              '<div class="div-itens">
                <h2>${item.modelo} - ${item.marca}</h2>
                <h3>Tamanho: ${item.tamanho} - Cor: ${item.cor} - R$:${item.preco}</h3>
            </div>
          </div>
        </a>
      </div>
    `;
        });
    }
}
function rendersale(itens) {
    if (roootElement) {
        roootElement.innerHTML = "";
        itens.forEach((item) => {
            roootElement.innerHTML += `
      <div> 
        '<div class="item-wrapper">
          '<img src="${item.imagem}" alt="">
            '<div class="div-itens">
              <h2>${item.modelo} - ${item.marca}</h2>
              <h3>Tamanho: ${item.tamanho} - Cor: ${item.cor} - R$:${item.preco}</h3>
          </div>
        </div>
      </div>
    `;
        });
    }
}
function search() {
    const searchInputValue = searchInputElement.value;
    const filterTypeValue = searchTypeElement.value;
    const newBlusas = blusas.filter((blusa) => blusa[filterTypeValue].includes(searchInputValue));
    render(newBlusas);
}
function eventListenerHandle() {
    var _a;
    (_a = searchButtonElement) === null || _a === void 0 ? void 0 : _a.addEventListener("click", search);
}
render(blusas);
rendersale(blusasDesconto);
eventListenerHandle();
