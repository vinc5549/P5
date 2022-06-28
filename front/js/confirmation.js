let urlParams = new URLSearchParams(document.location.search);
let orderId = urlParams.get("orderId");

let confirmationId = document.querySelector("#orderId");

confirmationId.textContent = orderId;