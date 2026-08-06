/*=========================================
    NOVASHOP APP
=========================================*/

/*
=========================================
    SELECTORS
=========================================
*/

const navbar = document.querySelector(".navbar");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const links = document.querySelectorAll(".nav-links a");

const addButtons = document.querySelectorAll(".product-info button");

const fadeElements = document.querySelectorAll(".fade-up");

const newsletterForm = document.querySelector(".newsletter form");

const newsletterInput = document.querySelector(".newsletter input");

/*
=========================================
    MOBILE MENU
=========================================
*/

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

/*
=========================================
    CLOSE MENU WHEN CLICKING A LINK
=========================================
*/

links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

/*
=========================================
    STICKY NAVBAR
=========================================
*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){

        navbar.style.padding = "12px 30px";

        navbar.style.boxShadow = "0 10px 35px rgba(0,0,0,.15)";

    }

    else{

        navbar.style.padding = "18px 35px";

        navbar.style.boxShadow = "0 15px 40px rgba(0,0,0,.08)";

    }

});

/*
=========================================
    SMOOTH SCROLL
=========================================
*/

links.forEach(link=>{

    link.addEventListener("click",(e)=>{

        const href = link.getAttribute("href");

        if(href.startsWith("#")){

            e.preventDefault();

            document.querySelector(href).scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/*
=========================================
    SCROLL REVEAL
=========================================
*/

const reveal = ()=>{

    fadeElements.forEach(item=>{

        const top = item.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            item.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();

/*
=========================================
    TOAST NOTIFICATION
=========================================
*/

function showToast(message){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    toast.style.position = "fixed";

    toast.style.bottom = "30px";

    toast.style.right = "30px";

    toast.style.padding = "15px 25px";

    toast.style.background = "#6C63FF";

    toast.style.color = "#fff";

    toast.style.borderRadius = "15px";

    toast.style.boxShadow = "0 15px 30px rgba(0,0,0,.2)";

    toast.style.zIndex = "9999";

    toast.style.animation = "fadeIn .4s";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },2500);

}

/*
=========================================
    CART
=========================================
*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

addButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        cart.push({

            product:"Sample Product"

        });

        localStorage.setItem("cart",JSON.stringify(cart));

        showToast("Product Added To Cart 🛒");

    });

});

/*
=========================================
    NEWSLETTER
=========================================
*/

newsletterForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const email = newsletterInput.value.trim();

    if(email===""){

        showToast("Enter your email.");

        return;

    }

    if(!email.includes("@")){

        showToast("Invalid Email");

        return;

    }

    showToast("Subscribed Successfully 🎉");

    newsletterInput.value="";

});

/*
=========================================
    ACTIVE NAVIGATION
=========================================
*/

window.addEventListener("scroll",()=>{

    let current="";

    document.querySelectorAll("section").forEach(section=>{

        const top = section.offsetTop-120;

        const height = section.clientHeight;

        if(pageYOffset>=top){

            current = section.getAttribute("id");

        }

    });

    links.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

console.log("NovaShop Loaded Successfully 🚀");
