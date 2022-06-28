// l'ID de l'url est stocké dans une variable
let urlParams = new URLSearchParams(document.location.search);
let productId = urlParams.get("id");

// fonction qui affiche les bonnes datas liées à l'ID
function kanapItem(item){
    let element = document.querySelector(".item__img");
    let itemImage = document.createElement("img");
    let itemTitle = document.getElementById("title");
    let itemPrice = document.getElementById("price");
    let itemDescription = document.getElementById("description");
    
    itemImage.src = item.imageUrl;
    itemImage.alt = item.altTxt;
    itemTitle.textContent = item.name;
    itemPrice.textContent = item.price;
    itemDescription.textContent = item.description;
    element.appendChild(itemImage);
}

// fonction qui injecte les datas du array "colors" dans le menu déroulant
function kanapColors(color){
    let select = document.getElementById("colors"); 
    let option = document.createElement("option"); 
    
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
}

// requête GET pour avoir les data "_id" de l'API + l'execution des fonctions
fetch("http://localhost:3000/API/products/" + productId)
    .then(function(res) {
        if (res.ok) {
            return res.json();
    }
    })
    .then(function(item) {
        kanapItem(item);
        for (let color of item.colors){
            kanapColors(color);
        }    
    });

// le bouton "ajouter au panier" est stocké dans une constante
const addToCart = document.getElementById("addToCart");

// message pop-up qui indique l'utilisateur que l'objet à été ajouté au panier
function itemAdded() {
    alert("Produit ajouté au panier !");
}

// fonction qui insère l'objet "selection" dans un array et ensuite insère le array dans le localStorage en :
// 1) verifiant si les champs "quantité" et "couleur" sont bien remplis
// 2) verifiant si l'item n'est pas déjà présent dans le array en comparant son ID et sa couleur
// 3) incrémente la quantité de l'item s'il est déja présent 
function setStorage() {
    let quantity = document.getElementById("quantity").value;
    let color = document.getElementById("colors").value;
    let selection = {
        "id": productId,
        "quantity": quantity,
        "color": color                 
    }
    let cart = JSON.parse(localStorage.getItem("cart"));

    if(quantity == 0 || color == '') {
        alert("Veuillez choisir une quantité et une couleur");
    }else if(cart){
        let index = cart.findIndex(itemInCart => itemInCart.id+"-"+itemInCart.color === selection.id+"-"+selection.color);
        let filter = cart.filter(itemInCart => itemInCart.id == selection.id && itemInCart.color == selection.color);
        if (index >= 0){
            let findQuantity = parseInt(filter[0].quantity);
            let updatedQuantity = parseInt(findQuantity) + parseInt(quantity);
            let selection = {
                "id": productId,
                "quantity": updatedQuantity.toString(),
                "color": color                 
            }
            cart[index] = selection;   
            localStorage.setItem("cart", JSON.stringify(cart));
            itemAdded();
        }else{
            cart.push(selection);
            localStorage.setItem("cart", JSON.stringify(cart));  
            itemAdded();
        } 
    }else{
        let cart = [];
        cart.push(selection);
        localStorage.setItem("cart", JSON.stringify(cart));
        itemAdded();
    }
    cart.sort(cartSort("id"));  
    localStorage.setItem("cart", JSON.stringify(cart));
}
// tri le localstorage par id
function cartSort(id) {
    return function(a, b) {
        return (a[id] < b[id]) ? -1 : (a[id] > b[id]) ? 1 : 0;
    }
}

// event qui lance la fonction
addToCart.addEventListener("click", (setStorage))