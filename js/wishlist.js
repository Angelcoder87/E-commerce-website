/*==========================================
    NOVASHOP WISHLIST
==========================================*/

let wishlist = JSON.parse(
    localStorage.getItem("novashop-wishlist")
) || [];

/*==========================================
    SAVE WISHLIST
==========================================*/

function saveWishlist() {

    localStorage.setItem(
        "novashop-wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistBadge();

}

/*==========================================
    UPDATE BADGE
==========================================*/

function updateWishlistBadge() {

    const badge = document.getElementById("wishlistCount");

    if (!badge) return;

    badge.textContent = wishlist.length;

}

/*==========================================
    ADD TO WISHLIST
==========================================*/

function addToWishlist(productId) {

    const product = products.find(item => item.id == productId);

    if (!product) return;

    const exists = wishlist.find(item => item.id == productId);

    if (exists) {

        if (typeof showToast === "function") {

            showToast("Already in wishlist ❤️");

        }

        return;

    }

    wishlist.push(product);

    saveWishlist();

    renderWishlist();

    if (typeof showToast === "function") {

        showToast(product.name + " added to wishlist ❤️");

    }

}

/*==========================================
    REMOVE
==========================================*/

function removeFromWishlist(productId) {

    wishlist = wishlist.filter(item => item.id != productId);

    saveWishlist();

    renderWishlist();

}

/*==========================================
    MOVE TO CART
==========================================*/

function moveToCart(productId) {

    addToCart(productId);

    removeFromWishlist(productId);

}

/*==========================================
    RENDER
==========================================*/

function renderWishlist() {

    const container = document.getElementById("wishlistItems");

    if (!container) return;

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = `

            <p class="empty-message">

                Your wishlist is empty.

            </p>

        `;

        return;

    }

    wishlist.forEach(item => {

        container.innerHTML += `

        <div class="wishlist-item">

            <img
                src="${item.image}"
                alt="${item.name}">

            <div class="wishlist-details">

                <h4>${item.name}</h4>

                <p>$${item.price}</p>

                <div class="wishlist-actions">

                    <button
                        onclick="moveToCart(${item.id})">

                        Add To Cart

                    </button>

                    <button
                        class="remove"
                        onclick="removeFromWishlist(${item.id})">

                        Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

/*==========================================
    INIT
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    updateWishlistBadge();

    renderWishlist();

});
