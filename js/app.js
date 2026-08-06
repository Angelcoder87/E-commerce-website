/*=========================================================
    NOVASHOP
    Main Application Script
=========================================================*/

/*=========================================================
    GLOBAL VARIABLES
=========================================================*/

const body = document.body;

const navbar = document.querySelector(".navbar");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const overlay = document.getElementById("overlay");

const loader = document.getElementById("loader");

const backToTop = document.getElementById("backToTop");

const searchModal = document.getElementById("searchModal");

const cartDrawer = document.getElementById("cartDrawer");

const wishlistDrawer = document.getElementById("wishlistDrawer");

const productModal = document.getElementById("productModal");

/*=========================================================
    INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

function initializeApp(){

    setupNavigation();

    setupStickyNavbar();

    setupLoader();

    setupBackToTop();

    setupTheme();

    setupSearch();

}
/*=========================================================
    HELPER FUNCTIONS
=========================================================*/

function openDrawer(drawer){

    if(!drawer) return;

    drawer.classList.add("open");

    overlay?.classList.add("show");

}

function closeDrawer(drawer){

    if(!drawer) return;

    drawer.classList.remove("open");

}

function openModal(modal){

    if(!modal) return;

    modal.classList.add("show");

    overlay?.classList.add("show");

}

function closeModal(modal){

    if(!modal) return;

    modal.classList.remove("show");

}

function closeEverything(){

    closeDrawer(cartDrawer);

    closeDrawer(wishlistDrawer);

    closeModal(searchModal);

    closeModal(productModal);

    overlay?.classList.remove("show");

}
/*=========================================================
    NAVIGATION
=========================================================*/

function setupNavigation(){

    if(menuBtn){

        menuBtn.addEventListener("click",()=>{

            navLinks.classList.toggle("active");

        });

    }

}
/*=========================================================
    STICKY NAVBAR
=========================================================*/

function setupStickyNavbar(){

    if(!navbar) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            navbar.classList.add("sticky");

        }

        else{

            navbar.classList.remove("sticky");

        }

    });

}
/*=========================================================
    LOADER
=========================================================*/

function setupLoader(){

    if(!loader) return;

    window.addEventListener("load",()=>{

        loader.style.opacity="0";

        loader.style.visibility="hidden";

        setTimeout(()=>{

            loader.remove();

        },500);

    });

}
/*=========================================================
    BACK TO TOP
=========================================================*/

function setupBackToTop(){

    if(!backToTop) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            backToTop.classList.add("show");

        }

        else{

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}
/*=========================================================
    DARK MODE
=========================================================*/

function setupTheme(){

    const button = document.getElementById("themeToggle");

    if(!button) return;

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme==="dark"){

        body.classList.add("dark");

    }

    button.addEventListener("click",()=>{

        body.classList.toggle("dark");

        localStorage.setItem(

            "theme",

            body.classList.contains("dark")
                ? "dark"
                : "light"

        );

    });

}
/*=========================================================
    SEARCH
=========================================================*/

function setupSearch(){

    const searchBtn = document.getElementById("searchBtn");

    const closeBtn = document.getElementById("closeSearch");

    const input = document.getElementById("searchInput");

    const results = document.getElementById("searchResults");

    if(!input || !results) return;

    /*-----------------------------
        OPEN SEARCH
    -----------------------------*/

    searchBtn?.addEventListener("click",()=>{

        openModal(searchModal);

        input.focus();

        renderSearchResults(products);

    });

    /*-----------------------------
        CLOSE SEARCH
    -----------------------------*/

    closeBtn?.addEventListener("click",()=>{

        closeModal(searchModal);

        overlay?.classList.remove("show");

    });

    /*-----------------------------
        LIVE SEARCH
    -----------------------------*/

    input.addEventListener("input",()=>{

        const query = input.value
            .trim()
            .toLowerCase();

        if(query===""){

            renderSearchResults(products);

            return;

        }

        const filtered = products.filter(product=>{

            return (

                product.name
                    .toLowerCase()
                    .includes(query)

                ||

                product.category
                    .toLowerCase()
                    .includes(query)

            );

        });

        renderSearchResults(filtered);

    });

}
/*=========================================================
    RENDER SEARCH RESULTS
=========================================================*/

function renderSearchResults(items){

    const results = document.getElementById("searchResults");

    if(!results) return;

    if(items.length===0){

        results.innerHTML=`

            <div class="search-empty">

                <i class="ri-search-eye-line"></i>

                <h3>No Products Found</h3>

                <p>

                    Try another keyword.

                </p>

            </div>

        `;

        return;

    }

    const html = items.map(product=>`

        <div
            class="search-item"
            data-id="${product.id}">

            <img
                src="${product.image}"
                alt="${product.name}">

            <div class="search-info">

                <span class="search-category">

                    ${product.category}

                </span>

                <h4>

                    ${product.name}

                </h4>

                <div class="shop-rating">

                    ${"★".repeat(product.rating)}

                </div>

                <div class="search-price">

                    $${product.price}

                </div>

            </div>

            <div class="search-actions">

                <button
                    class="search-cart"
                    data-id="${product.id}">

                    <i class="ri-shopping-cart-line"></i>

                </button>

                <button
                    class="search-heart"
                    data-id="${product.id}">

                    <i class="ri-heart-3-line"></i>

                </button>

            </div>

        </div>

    `).join("");

    results.innerHTML = html;

    attachSearchEvents();

}
/*=========================================================
    SEARCH EVENTS
=========================================================*/

function attachSearchEvents(){

    document
        .querySelectorAll(".search-cart")
        .forEach(button=>{

            button.addEventListener("click",()=>{

                addToCart(

                    Number(button.dataset.id)

                );

            });

        });

    document
        .querySelectorAll(".search-heart")
        .forEach(button=>{

            button.addEventListener("click",()=>{

                addToWishlist(

                    Number(button.dataset.id)

                );

            });

        });

    document
        .querySelectorAll(".search-item")
        .forEach(item=>{

            item.addEventListener("click",(e)=>{

                if(

                    e.target.closest("button")

                ) return;

                const id = Number(

                    item.dataset.id

                );

                openQuickView(id);

            });

        });

}
/*=========================================================
    KEYBOARD SHORTCUTS
=========================================================*/

function setupKeyboard(){

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeEverything();

        }

        if(

            (e.ctrlKey || e.metaKey)

            &&

            e.key.toLowerCase()==="k"

        ){

            e.preventDefault();

            openModal(searchModal);

            document
                .getElementById("searchInput")
                ?.focus();

        }

    });

    overlay?.addEventListener(

        "click",

        closeEverything

    );

}
