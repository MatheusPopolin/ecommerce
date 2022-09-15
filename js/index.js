let contador = 0;
let total = 0;

function listarItens(data){
    let tagUl = document.querySelector(".vitrine");
    for(let i=0; i<data.length; i++){
        let tagLi = document.createElement("li");
        tagLi.innerHTML =  `<img src="${data[i].img}" alt="Imagem de ${data[i].nameItem}">
                            <h3 class="categoria">${data[i].tag[0]}</h3>
                            <h2>${data[i].nameItem}</h2>
                            <p>${data[i].description}</p>
                            <p class="preco">R$ ${data[i].value}.00</p>
                            <button class="botao-adicionar" id="${data[i].id}">${data[i].addCart}</button>`;
        tagUl.appendChild(tagLi);
    }
}
listarItens(data);

function infoCarrinho(){
    if(contador==0){
        tagSection = document.querySelector(".carrinho");
        tagSection.innerHTML = `<h2>Carrinho de compras</h2>`
        tagDiv = document.createElement("div");
        tagDiv.classList.add("info-carrinho");
        tagDiv.innerHTML = `<p>Carrinho Vazio</p>
                            <p class="add-itens">Adicione Itens</p>`;
        tagSection.appendChild(tagDiv);
        
    } else if(contador>0){
        document.querySelector(".info-carrinho").remove();
        tagSection = document.querySelector(".carrinho");
        tagDiv = document.createElement("div");
        tagDiv.classList.add("info-carrinho");
        tagDiv1 = document.createElement("div");
        tagDiv2 = document.createElement("div");
        tagDiv1.innerHTML = `<p>Quantidade</p>
                            <p>${contador}</p>`;
        tagDiv2.innerHTML = `<p>Total: </p>
                            <p>R$ ${total}.00</p>`;                        
        tagDiv.append(tagDiv1,tagDiv2);
        tagSection.appendChild(tagDiv);
    }
}



function addCarrinho(item){
    let tagUl = document.createElement("ul");
    tagUl.classList.add("lista-carrinho");

    let tagLi     = document.createElement("li");
    let tagDiv1   = document.createElement("div");
    let tagImg    = document.createElement("img");
    let tagDiv2   = document.createElement("div");
    let tagH3     = document.createElement("h3");
    let tagP      = document.createElement("p");
    let tagButton = document.createElement("button");
    
    tagImg.src = item.img;
    tagImg.alt = `Imagem de ${item.nameItem}`;
    tagH3.innerText = item.nameItem;
    tagP.innerText = `R$ ${item.value}.00`;
    tagButton.innerText = "Remover Produto";
    tagButton.classList.add("botao-remover");
    tagButton.addEventListener("click", function(event){
    event.path[2].remove();
    contador--;
    total -= item.value; 
    infoCarrinho();
    }) 
    
    tagDiv1.appendChild(tagImg);
    tagDiv2.append(tagH3, tagP, tagButton);
    tagLi.append(tagDiv1, tagDiv2);
    tagUl.appendChild(tagLi);
    document.querySelector(".carrinho").appendChild(tagUl);
    contador++;
    total += item.value;
    infoCarrinho();
}    

let botoesAdd = document.querySelectorAll(".botao-adicionar")
for(let i=0; i<botoesAdd.length; i++){
    botoesAdd[i].addEventListener("click", function(event){
        let elemento = event.target;
        let id = parseInt(elemento.id);
        
        for(let j=0; j<data.length; j++){
            if(id==data[j].id){
                addCarrinho(data[j]);                             
            }        
        }           
    })
}


