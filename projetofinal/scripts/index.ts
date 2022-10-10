type Receita = {
  Author: string;
  Description: string;
  Ingredients: string[];
  Method: string[];
  Name: string;
  url: string;
  urlImage: string;
}

const elemento = document.querySelector(".listar-receitas");
const botaoPesquisar = document.querySelector("#botao-pesquisar");
const pesquisaInput = document.querySelector("#input-pesquisar");

//O método split() divide uma String em uma lista ordenada de substrings, coloca essas substrings em um array e retorna o array
function arrayFiltro(arrayIngredientes: string){
  return arrayIngredientes.split(","); //vírgula é o parâmetro de divisão do array
}

async function getReceitas(): Promise<Receita[]> {
  const request = await fetch("https://receitas-server.vercel.app/api");
  const data = await request.json();
  // console.log(data);
  return data;
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

async function filtroIngredientes(event: MouseEvent, ingrediente: string){
  const ingredienteFiltrado = await getReceitas();
  const filtro = ingredienteFiltrado.filter(dados => {
    const variosIngredientes = arrayFiltro(ingrediente).length > 1;
    if(!variosIngredientes){
      const incluiIngredientes = dados.Ingredients.filter((ingredientesFiltrados) => {
        return ingredientesFiltrados.toLowerCase().includes(ingrediente.toLowerCase()); 
      });
      return incluiIngredientes.length ? dados :false;
    }
    if(variosIngredientes){
      let acumulador: string[] = [];
      const procuraValor = arrayFiltro(ingrediente);

      for(let i = 0; i < procuraValor.length; i++){
        for(let y = 0; y < dados.Ingredients.length; y++){
          if(dados.Ingredients[y].includes(procuraValor[i])){
            if(acumulador.includes(procuraValor[i])){
              return false;
            }
            acumulador.push(procuraValor[i]);
          }
        }
      }
      if(acumulador.length === procuraValor.length)return true;
    }
  });
  cardsReceita(filtro);
  console.log(filtro);
}

function cardsReceita(itens: Receita[]){
  if(elemento){
    elemento.innerHTML = "";
    var i =0;
    itens.forEach((item) => {
      if(i>14){return false}
      elemento.innerHTML +=
      `<div class="listar-itens">
        <div class="imagem"><img src="${item.urlImage}" alt="food-chef" <h5><a href="">${item.Name}</a></h5></div>
      </div>`
      i++;
    });
  }
}

async function pesquisa() {
  const retorno = await getReceitas();
  const pesquisarIngrediente = (pesquisaInput as HTMLInputElement).value;
  const valorIngrediente= retorno.filter((receita) => receita.Ingredients.includes(pesquisarIngrediente));
  cardsReceita(valorIngrediente);
}

function eventListenerHandle() {
  (botaoPesquisar as HTMLButtonElement)?.addEventListener("click", pesquisa);
}

// filtroIngredientes("chocolate, dark");
eventListenerHandle();