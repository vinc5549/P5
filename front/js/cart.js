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
    newColor.textContent = kanap.color;
    newQuantity.textContent = "Qté : ";
    newDelete.textContent = "Supprimer";

   // gestion de l'event QUANTITE
    newInput.addEventListener("change", (event) => {        
        article = event.target.closest("article");    
        id = article.getAttribute('data-id');
        color = article.getAttribute('data-color');
        let quantityUpdateIndex = cart.findIndex(itemInCart => itemInCart.id === id && itemInCart.color === color);
        cart[quantityUpdateIndex].quantity = event.target.value;
        localStorage.setItem("cart", JSON.stringify(cart));
        calc();
    });

    // gestion de l'event DELETE
    newDelete.addEventListener("click", (event) => {
        article = event.target.closest("article");
        article.remove();
        id = article.getAttribute('data-id');
        color = article.getAttribute('data-color');
        let cartDeleteIndex = cart.findIndex(itemInCart => itemInCart.id === id && itemInCart.color === color);
        cart.splice(cartDeleteIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        calc();
    });

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

    
        fetch("http://localhost:3000/api/products/" + kanap.id)
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


// execution de la boucle pour afficher les datas
if (cart ===null || cart.length == 0) {
        
    document.querySelector("#cartAndFormContainer > h1").textContent= "VOTRE PANIER EST VIDE";
}
else {
    for (let kanap of cart) {
        createKanap(kanap);
    }
}

/*********** BOUTON SUPPRIMER + UPDATE QUANTITY + TOTAL PRICE *****/
/******************************************************************/



/************** calcul total price ***************/
let totalDisplay = document.querySelector("#totalPrice"); 
let totalQuantity = document.querySelector("#totalQuantity");
totalDisplay.textContent = "0";
totalQuantity.textContent= "0";

// fonction qui calcule le prix total des produits du panier
// 1) cherche le prix de chaque produit dans l'API
// 2) fait un calcul dans un tableau via un accumulateur pour le nombre d'articles et le prix total
function calc() {
    let totalPriceArray = [];
    let totalItemArray = [];
    for (let k = 0; k < cart.length; k++){
        fetch("http://localhost:3000/api/products/" + cart[k].id)
            .then(function(res) {
            if (res.ok) {
                return res.json();
            }
            })
            .then(function(kanapApi) {
                let totalItems = parseInt(cart[k].quantity);
                totalItemArray.push(totalItems);
                let totalItemSum = (accumulator, value) => accumulator + value;
                let totalItemsInCart = totalItemArray.reduce(totalItemSum);
                totalQuantity.textContent = totalItemsInCart;
                
                let total = kanapApi.price * cart[k].quantity;
                totalPriceArray.push(total);
                let totalPriceSum = (accumulator, value) => accumulator + value;
                let totalPrice = totalPriceArray.reduce(totalPriceSum);
                totalDisplay.textContent = totalPrice;
            })
    }
    if (cart.length == 0){
        totalQuantity.textContent = "0";
        totalDisplay.textContent = "0";
    }
}


calc();



/********************* FORM ****************************************************/
/*******************************************************************************/
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const emailInput = document.querySelector("#email");
const orderInput = document.querySelector("#order");

// fonction qui créer un object contact et un array qu'on envoi à l'API et qui retourne un orderId
function sendOrder() {
    let contact = {
        firstName: firstNameInput.value, 
        lastName: lastNameInput.value, 
        address: addressInput.value, 
        city: cityInput.value, 
        email: emailInput.value
    }    
    let products = [];
    let itemsInCart = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < itemsInCart.length; i++) {
            products.push(itemsInCart[i].id)
        }
    let order = {
        contact : contact,
        products : products
    }
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    })
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        document.location.href = "confirmation.html?orderId="+value.orderId;
    });
}

// factorisation des validations
function validation (field, zone, msg, regex) {
    field.value.trim();
 
    let messageEl  = document.querySelector("#" + zone + "ErrorMsg");
    messageEl.textContent=""; 
    let zoneValid = regex
    if (zoneValid.test(field.value)) {
        console.log(`zone ${zone} is valid`);
        return true;
    } else {
        messageEl.textContent = msg + " invalide";        
        return false;
    }
}

// verifications Fname et Lname avec regex 
function nameValidation(field, zone, msg) {
    return validation(field, zone, msg,  /^[a-zA-ZÀ-ÿ- ']{2,40}$/);}

// verification adress et city avec regex
function locationValidation(field, zone, msg) {
    return validation(field, zone, msg,  /^[a-zA-ZÀ-ÿ0-9- ',]{2,60}$/);}

// verification email avec regex
function emailValidation(field, zone, msg) {
    return validation(field, zone, msg,  /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);}

// fonction qui vérifie le statut boolean de toute les verifications d'input
function form_verify() {
    return (nameValidation(firstNameInput, "firstName", "Prénom") 
        && nameValidation(lastNameInput, "lastName", "Nom")
        && locationValidation(addressInput, "address", "Adresse")
        && nameValidation(cityInput, "city", "Ville")
        && emailValidation(emailInput, "email", "Adresse mail"));
}

// event qui lance la commande apres les verifications
orderInput.addEventListener("click", function(e) {
    e.preventDefault();
    if (form_verify() == true){
        console.log("Formulaire accepté");
        sendOrder();
    }else{
        console.log("NOPE");
    }
});
