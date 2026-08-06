/*=========================================
    NOVASHOP
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

function initializeApp(){

    setupNavigation();

    setupBackToTop();

    setupLoader();

    setupCartButtons();

    setupWishlistButtons();

    setupQuickView();

    setupDrawers();

    setupSearch();

    setupTheme();

    setupRevealAnimations();

}

/*=========================================
    NAVIGATION
=========================================*/

function setupNavigation(){

    const menuBtn = document.querySelector(".menu-btn");

    const navLinks = document.querySelector(".nav-links");

    if(menuBtn){

        menuBtn.addEventListener("click",()=>{

            navLinks.classList.toggle("active");

        });

    }

}

/*=========================================
    BACK TO TOP
=========================================*/

function setupBackToTop(){

    const button = document.getElementById("backToTop");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            button.classList.add("show");

        }

        else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*=========================================
    LOADER
=========================================*/

function setupLoader(){

    const loader = document.getElementById("loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        loader.style.opacity="0";

        setTimeout(()=>{

            loader.style.display="none";

        },500);

    });

}

/*=========================================
    CART BUTTONS
=========================================*/

function setupCartButtons(){

    const buttons = document.querySelectorAll(".add-cart");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const product = button.closest(".product-card");

            const id = Number(product.dataset.id);

            addToCart(id);

        });

    });

}

/*=========================================
    WISHLIST
=========================================*/

function setupWishlistButtons(){

    const buttons = document.querySelectorAll(".add-wishlist");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const product = button.closest(".product-card");

            const id = Number(product.dataset.id);

            addToWishlist(id);

        });

    });

}
/*=========================================
    QUICK VIEW MODAL
=========================================*/

function setupQuickView(){

    const buttons = document.querySelectorAll(".quick-view");

    const modal = document.getElementById("productModal");

    if(!modal) return;

    const image = document.getElementById("modalImage");
    const title = document.getElementById("modalTitle");
    const category = document.getElementById("modalCategory");
    const price = document.getElementById("modalPrice");
    const addButton = document.getElementById("modalCart");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const card = button.closest(".product-card");

            const id = Number(card.dataset.id);

            const product = products.find(p=>p.id===id);

            if(!product) return;

            image.src = product.image;
            image.alt = product.name;
            title.textContent = product.name;
            category.textContent = product.category;
            price.textContent = "$" + product.price;

            addButton.onclick = ()=>{

                addToCart(product.id);

            };

            modal.classList.add("show");

        });

    });

}

/*=========================================
    SEARCH
=========================================*/

function setupSearch(){

    const openBtn = document.getElementById("searchBtn");

    const modal = document.getElementById("searchModal");

    const input = document.getElementById("searchInput");

    const results = document.getElementById("searchResults");

    if(!modal || !input) return;

    openBtn?.addEventListener("click",()=>{

        modal.classList.add("show");

        input.focus();

    });

    input.addEventListener("input",()=>{

        const value = input.value.toLowerCase().trim();

        results.innerHTML="";

        if(value==="") return;

        const filtered = products.filter(product=>{

            return product.name.toLowerCase().includes(value)
                || product.category.toLowerCase().includes(value);

        });

        if(filtered.length===0){

            results.innerHTML="<p>No products found.</p>";

            return;

        }

        filtered.forEach(product=>{

            results.innerHTML += `

            <div class="search-item">

                <img src="${product.image}" alt="${product.name}">

                <div>

                    <h4>${product.name}</h4>

                    <p>$${product.price}</p>

                </div>

            </div>

            `;

        });

    });

}

/*=========================================
    DRAWERS
=========================================*/

function setupDrawers(){

    const cartButton = document.getElementById("cartBtn");

    const wishlistButton = document.getElementById("wishlistBtn");

    const cartDrawer = document.getElementById("cartDrawer");

    const wishlistDrawer = document.getElementById("wishlistDrawer");

    const overlay = document.getElementById("overlay");

    cartButton?.addEventListener("click",()=>{

        cartDrawer.classList.add("open");

        overlay.classList.add("show");

    });

    wishlistButton?.addEventListener("click",()=>{

        wishlistDrawer.classList.add("open");

        overlay.classList.add("show");

    });

    document.getElementById("closeCart")?.addEventListener("click",closeEverything);

    document.getElementById("closeWishlist")?.addEventListener("click",closeEverything);

    overlay?.addEventListener("click",closeEverything);

}

/*=========================================
    CLOSE EVERYTHING
=========================================*/

function closeEverything(){

    document.querySelectorAll(".drawer").forEach(drawer=>{

        drawer.classList.remove("open");

    });

    document.querySelectorAll(".modal").forEach(modal=>{

        modal.classList.remove("show");

    });

    document.getElementById("overlay")?.classList.remove("show");

}

/*=========================================
    DARK MODE
=========================================*/

function setupTheme(){

    const button = document.getElementById("themeToggle");

    if(!button) return;

    const saved = localStorage.getItem("theme");

    if(saved==="dark"){

        document.body.classList.add("dark");

    }

    button.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("dark")
                ? "dark"
                : "light"

        );

    });

}

/*=========================================
    SCROLL REVEAL
=========================================*/

function setupRevealAnimations(){

    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(element=>{

        observer.observe(element);

    });

}
