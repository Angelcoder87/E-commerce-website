/*=========================================================
    NOVASHOP PRODUCTS
=========================================================*/

const products = [

{
    id: 1,
    name: "Minimal Sneakers",
    category: "Footwear",
    price: 89,
    oldPrice: 120,
    rating: 5,
    stock: 25,
    badge: "New",
    image: "images/product1.jpg",
    description: "Premium lightweight sneakers designed for maximum comfort and modern style."
},

{
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129,
    oldPrice: 159,
    rating: 5,
    stock: 18,
    badge: "Sale",
    image: "images/product2.jpg",
    description: "Noise-cancelling Bluetooth headphones with crystal-clear audio."
},

{
    id: 3,
    name: "Luxury Watch",
    category: "Accessories",
    price: 249,
    oldPrice: 299,
    rating: 5,
    stock: 9,
    badge: "Best Seller",
    image: "images/product3.jpg",
    description: "Elegant stainless steel watch crafted for every occasion."
},

{
    id: 4,
    name: "Modern Backpack",
    category: "Travel",
    price: 79,
    oldPrice: 99,
    rating: 5,
    stock: 30,
    badge: "Hot",
    image: "images/product4.jpg",
    description: "Stylish backpack with a padded laptop compartment."
}

];

// Make available globally
window.products = products;