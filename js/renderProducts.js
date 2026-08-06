/*=========================================
    RENDER PRODUCTS
=========================================*/

function renderProducts(){

    const grid = document.querySelector(".product-grid");

    if(!grid) return;

    grid.innerHTML = "";

    products.forEach(product=>{

        grid.innerHTML += `

        <article
            class="product-card fade-up"
            data-id="${product.id}">

            <div class="badge">

                ${product.badge}

            </div>

            <div class="overlay"></div>

            <img
                src="${product.image}"
                alt="${product.name}">

            <div class="product-info">

                <span class="product-category">

                    ${product.category}

                </span>

                <h3>

                    ${product.name}

                </h3>

                <div class="rating">

                    ${"★".repeat(product.rating)}

                </div>

                <p class="price">

                    $${product.price}

                </p>

                <div class="product-buttons">

                    <button class="add-cart">

                        <i class="ri-shopping-cart-line"></i>

                        Add To Cart

                    </button>

                    <button class="quick-view">

                        <i class="ri-eye-line"></i>

                    </button>

                    <button class="add-wishlist">

                        <i class="ri-heart-3-line"></i>

                    </button>

                </div>

            </div>

        </article>

        `;

    });

}