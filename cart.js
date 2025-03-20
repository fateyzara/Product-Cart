// Select cart elements
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const modal = document.getElementById("order-modal");
const modalContent = document.getElementById("order-details");
const newOrderBtn = document.getElementById("new-order");

// Store cart items
let cart = [];

// Function to add product to cart
function addToCart(name, price, imgSrc) {
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, imgSrc, quantity: 1 });
    }
    
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    cartItemsContainer.innerHTML = "";
    
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.imgSrc}" width="40">
            <span>${item.name} (${item.quantity}x)</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to handle checkout
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    modalContent.innerHTML = cart.map(item => `
        <div>
            <img src="${item.imgSrc}" width="40">
            <span>${item.name} (${item.quantity}x)</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join("") + `<p class="order-total">Total: $${totalAmount.toFixed(2)}</p>`;

    modal.style.display = "block";
});

// Function to reset cart after order
newOrderBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
    modal.style.display = "none";
});

// Adding event listeners to buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const productCard = event.target.closest(".product");
        const name = productCard.querySelector("h3").innerText;
        const price = parseFloat(productCard.querySelector(".price").innerText.replace("$", ""));
        const imgSrc = productCard.querySelector("img").src;

        addToCart(name, price, imgSrc);
    });
});
