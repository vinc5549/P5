let cart = JSON.parse(localStorage.getItem("cart"));

// fonction qui affiche les bonnes datas en rapport avec :
// 1) les items contenus dans le localStorage (le array nommé "cart")
// 2) les items contenus dans l'API
function createKanap(kanap){
    let element = document.querySelector("#cart__items");
    let newArticle = document.createElement("article");
    let newDiv_1 = document.createElement("div");
    let newDiv_2 = document.createElement("div");
    let newDivInDiv_1 = document.createElement("div");
    let newDivInDiv_2 = document.createElement("div");
    let newImage = document.createElement("img");
    let newTitle = document.createElement("h2");
    let newColor = document.createElement("p");
    let newPrice = document.createElement("p");
    let newDiv_again = document.createElement("div")
    let newDiv_again_2 = document.createElement("div")
    let newQuantity = document.createElement("p");
    let newInput = document.createElement("input");
    let newDelete = document.createElement("p");

    newArticle.setAttribute("class", "cart__item")
    newArticle.setAttribute("data-id", kanap.id);
    newArticle.setAttribute("data-color", kanap.color);
    newDiv_1.setAttribute("class", "cart__item__img");
    newDiv_2.setAttribute("class", "cart__item__content__settings");
    newDiv_again.setAttribute("class", "cart__item__content__settings__quantity");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("class","itemQuantity");
    newInput.setAttribute("name", "itemQuantity");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "100");
    newInput.setAttribute("value", kanap.quantity);
    newDiv_again_2.setAttribute("class", "cart__item__content__settings__delete");
    newDelete.setAttribute("class", "deleteItem");
    newDelete.setAttribute("data-id", kanap.id);
    newDelete.setAttribute("data-color", kanap.color);
    newQuantity.setAttribute("data-id", kanap.id);
    newQuantity.setAttribute("data-color", kanap.color);
    newColor.textContent = kanap.color;
    newQuantity.textContent = kanap.quantity;
    newDelete.textContent = "Supprimer";

    element.appendChild(newArticle);
    newArticle.appendChild(newDiv_1);
    newArticle.appendChild(newDiv_2);
    newDiv_1.appendChild(newImage);
    newDiv_2.appendChild(newDivInDiv_1);
    newDiv_2.appendChild(newDivInDiv_2);
    newDivInDiv_1.appendChild(newTitle);
    newDivInDiv_1.appendChild(newColor);
    newDivInDiv_1.appendChild(newPrice);
    newDivInDiv_2.appendChild(newDiv_again);
    newDivInDiv_2.appendChild(newDiv_again_2);
    newDiv_again.appendChild(newQuantity)
    newDiv_again.appendChild(newInput);
    newDiv_again_2.appendChild(newDelete);

    for (let i = 0; i < cart.length; i++ ){
        fetch("http://localhost:3000/API/products/" + kanap.id)
        .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        })
        .then(function(kanapApi) {
            newImage.src = kanapApi.imageUrl;
            newImage.alt = kanapApi.altTxt;
            newTitle.textContent = kanapApi.name;
            newPrice.textContent = kanapApi.price + " €";
        })
    }          
}

// execution de la boucle pour afficher les datas
for (let kanap of cart) {
    createKanap(kanap);  
}

