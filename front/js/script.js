// recovery of Api content and insertion in DOM
async function getProducts() {
     await fetch("http://localhost:3000/api/products")
     .then(res => res.json())
     .then(produit => {
         for (const item of produit) {
             document.querySelector("section").innerHTML +=
                 `<a href="./product.html?id=${item._id}">
                     <article>
                         <img src="${item.imageUrl}" alt="${item.altTxt}">
                         <h3 class="productName">
                             ${item.name}
                         </h3>
                         <p class="productDescription">
                         ${item.description}
                         </p>
                     </article>
                 </a>`
         }
     })
     .catch(function(err) {
         console.log("erreur")
     })
 }
 //execution of the function
 getProducts()


 
/*
let meubleData = [];

const fetchMeuble = async () => {
await fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((promise) => {
     meubleData = promise
     console.log(meubleData);
});
};

const meubleDisplay = async () => {
     await fetchMeuble();

     document.getElementById("items").innerHTML = `<div><img class="banniere"
      src="${meubleData[3].imageUrl}" alt="image items du site" "/></div>`
      
};

meubleDisplay();
*/



/*const img = document.getElementById('items');

fetch('http://localhost:3000/api/products')
     .then(res => res.json())
     .then(data => img.src = data[0].url)
 
*/

