/*==========================================
    NOVASHOP SHOP
==========================================*/

let filteredProducts = [...products];

let currentPage = 1;

const productsPerPage = 8;

/*==========================================
    INITIALIZE
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeShop();

});

function initializeShop(){

    renderProducts();

    setupSearch();

    setupSorting();

    setupCategoryFilters();

}

/*==========================================
    RENDER PRODUCTS
==========================================*/

function renderProducts(){

    const grid = document.querySelector(".shop-grid");

    if(!grid) return;

    const start = (currentPage - 1) * productsPerPage;

    const end = start + productsPerPage;

    const pageProducts = filteredProducts.slice(start, end);

    if(pageProducts.length === 0){

        grid.innerHTML = `

        <div class="empty-products">

            <i class="ri-shopping-bag-line"></i>

            <h2>No Products Found</h2>

            <p>Try changing your search or filters.</p>

        </div>

        `;

        return;

    }

    const html = pageProducts.map(product => `

        <article
            class="shop-product"
            data-id="${product.id}">

            <div class="shop-product-image">

                <span class="shop-badge">

                    ${product.badge}

                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <div class="shop-actions">

                    <button
                        class="wishlist-btn"
                        data-id="${product.id}">

                        <i class="ri-heart-3-line"></i>

                    </button>

                    <button
                        class="quick-btn"
                        data-id="${product.id}">

                        <i class="ri-eye-line"></i>

                    </button>

                </div>

            </div>

            <div class="shop-info">

                <span class="shop-category">

                    ${product.category}

                </span>

                <h3>

                    ${product.name}

                </h3>

                <div class="shop-rating">

                    ${"★".repeat(product.rating)}

                </div>

                <div class="shop-price">

                    <span class="current">

                        $${product.price}

                    </span>

                    <span class="old">

                        $${product.oldPrice}

                    </span>

                </div>

                <button
                    class="shop-cart"
                    data-id="${product.id}">

                    <i class="ri-shopping-cart-line"></i>

                    Add To Cart

                </button>

            </div>

        </article>

    `).join("");

    grid.innerHTML = html;

    attachProductEvents();

}

/*==========================================
    ATTACH EVENTS
==========================================*/

function attachProductEvents(){

    document.querySelectorAll(".shop-cart").forEach(button=>{

        button.addEventListener("click",()=>{

            addToCart(Number(button.dataset.id));

        });

    });

    document.querySelectorAll(".wishlist-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            addToWishlist(Number(button.dataset.id));

        });

    });

    document.querySelectorAll(".quick-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            openQuickView(Number(button.dataset.id));

        });

    });

}
