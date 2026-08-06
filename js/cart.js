/*==========================================
    NOVASHOP CART
==========================================*/

let cart = JSON.parse(localStorage.getItem("novashop-cart")) || [];

/*==========================================
    SAVE CART
==========================================*/

function saveCart() {

    localStorage.setItem(
        "novashop-cart",
        JSON.stringify(cart)
    );

    updateCartBadge();

}

/*==========================================
    UPDATE BADGE
==========================================*/

function updateCartBadge() {

    const badge = document.getElementById("cartCount");

    if (!badge) return;

    const total = cart.reduce((sum, item) => {

        return sum + item.quantity;

    }, 0);

    badge.textContent = total;

}

/*==========================================
    ADD PRODUCT
==========================================*/

function addToCart(productId) {

    const product = products.find(item => item.id == productId);

    if (!product) return;

    const existing = cart.find(item => item.id == productId);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }

    saveCart();

    if (typeof showToast === "function") {

        showToast(product.name + " added to cart");

    }

    renderCart();

}

/*==========================================
    REMOVE PRODUCT
==========================================*/

function removeFromCart(productId) {

    cart = cart.filter(item => item.id != productId);

    saveCart();

    renderCart();

}

/*==========================================
    CHANGE QUANTITY
==========================================*/

function changeQuantity(productId, amount) {

    const item = cart.find(p => p.id == productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }

    saveCart();

    renderCart();

}

/*==========================================
    TOTAL
==========================================*/

function getCartTotal() {

    return cart.reduce((sum, item) => {

        return sum + (item.price * item.quantity);

    }, 0);

}

/*==========================================
    RENDER CART
==========================================*/

function renderCart() {

    const container = document.getElementById("cartItems");

    const total = document.getElementById("cartTotal");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `

            <p class="empty-message">

                Your cart is empty.

            </p>

        `;

        if (total) {

            total.textContent = "$0.00";

        }

        return;

    }

    cart.forEach(item => {

        container.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p>$${item.price}</p>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${item.id}, -1)">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">+</button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${item.id})">

                <i class="ri-delete-bin-line"></i>

            </button>

        </div>

        `;

    });

    if (total) {

        total.textContent =

            "$" + getCartTotal().toFixed(2);

    }

}

/*==========================================
    INIT
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    updateCartBadge();

    renderCart();

});