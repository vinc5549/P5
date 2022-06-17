// recovery of Api content and insertion in DOM
async function getProducts() {
     await fetch("http://localhost:3000/api/products")
     .then(function(res) {
        if (res.ok) {
            return res.json();
    }
    })
    .then(function(value) {
        let kanapList = value;
        for (let kanap of kanapList) {
            kanapCard(kanap);
        }
    });
    function kanapCard(kanap){
        let element = document.querySelector(".items");
        let newLink = document.createElement("a");
        let newArticle = document.createElement("article");
        let newImage = document.createElement("img");
        let newTitle = document.createElement("h3");
        let newText = document.createElement("p");
    
        newTitle.setAttribute("class", "productName");
        newText.setAttribute("class", "productDescription");
        newLink.href ="./product.html?id=" + kanap._id;
        newImage.src = kanap.imageUrl;
        newImage.alt = kanap.altTxt;
        newTitle.textContent = kanap.name;
        newText.textContent = kanap.description;
    
        element.appendChild(newLink);
        newLink.appendChild(newArticle);
        newArticle.appendChild(newImage);
        newArticle.appendChild(newTitle);
        newArticle.appendChild(newText);
    }
     }
 //execution of the function
 getProducts()


 /*
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
*/

