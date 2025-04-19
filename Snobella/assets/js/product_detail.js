async function productData(id) {
    let products = await (await fetch("http://localhost:3000/products")).json();

    let findProduct = products.find((product) => product.id == id);
    return findProduct;

}

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = users.find((user) => user.isLogined == true);
let usernameBtn = document.querySelector(".username");
usernameBtn.textContent = currentUser?.username;


let Url = new URLSearchParams(location.search);
let id = Url.get("id");

let productContainer = document.querySelector("#product-detail-container");

productData(id).then((findProduct) => {
    if (!findProduct) {
        productContainer.textContent = "Product not found!";
        return;
    }

    let container = document.createElement("div");
    container.className = "container detail";

    let homeImg = document.createElement("img");
    homeImg.src = "./assets/images/home.png";
    homeImg.alt = "Shoulderbag";
    homeImg.className = "shoulderbag";

    let row = document.createElement("div");
    row.className = "row";

    let productWrapper = document.createElement("div");
    productWrapper.className = "product-container";


    let fourimage = document.createElement("div");
    fourimage.className = "fourimage";

    let upIcon = document.createElement("i");
    upIcon.className = "fa-solid fa-chevron-up";

    fourimage.appendChild(upIcon);
    for (let i = 0; i < 4; i++) {
        let img = document.createElement("img");
        img.src = findProduct.image;
        img.alt = `Image ${i + 1}`;
        fourimage.appendChild(img);
    }
    let downIcon = document.createElement("i");
    downIcon.className = "fa-solid fa-chevron-down";
    fourimage.appendChild(downIcon);


    let mainImage = document.createElement("div");
    mainImage.className = "main-image";

    let badge = document.createElement("div");
    badge.className = "discount-badge";

    if (!isNaN(findProduct.discount)) {
        badge.textContent = `${findProduct.discount} %`;
        badge.style.backgroundColor = "#DF4244";
    } else {
        badge.textContent = "New";
        badge.style.backgroundColor = "#4CAF50";
    }

    let heartIcon = document.createElement("i");
    heartIcon.className = "fa-regular fa-heart wishlist-icon";
    heartIcon.style.cursor="pointer";

    if (currentUser?.wishlist.some(item => item.id === findProduct.id)) {
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
    }

    heartIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleUserWishlist(findProduct.id, heartIcon, findProduct);
    });


    function toggleUserWishlist(productId, heartIcon, findProduct) {
        if (!currentUser) {
            toast("Please login to add wishlist");

            setTimeout(() => {
                window.location.href = "login.html";
            }, 3000);
            return;
        }


        let userIndex = users.findIndex((user) => user.id == currentUser.id);
        let currentProduct = currentUser.wishlist.some((item) => item.id === productId);


        if (currentProduct) {
            let currentProductIndex = currentUser.wishlist.findIndex(
                (product) => product.id == productId
            );
            currentUser.wishlist.splice(currentProductIndex, 1);
    
            heartIcon.classList.add("fa-regular");
            heartIcon.classList.remove("fa-solid");
    
            toast("Product removed from wishlist...");
        } else {
            currentUser.wishlist.push(findProduct);
    
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa-solid");
    
            toast("Product added to wishlist...");
        }
    
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }



let mainImg = document.createElement("img");
mainImg.src = findProduct.image;
mainImg.alt = "Main Product Image";

mainImage.append(badge, heartIcon, mainImg);


let content = document.createElement("div");
content.className = "product-content";

let title = document.createElement("h1");
title.textContent = findProduct.title;

let rating = document.createElement("div");
rating.className = "rating";
let stars = document.createElement("img");
stars.src = "./assets/images/stars.png";
stars.alt = "Stars Rating";
rating.appendChild(stars);

let priceOptions = document.createElement("div");
priceOptions.className = "price-options";

let price1 = document.createElement("button");
price1.innerHTML = `2-9 pieces <strong>US $${findProduct.price}</strong>`;

let price2 = document.createElement("button");
price2.innerHTML = `10-49 pieces <strong>US $${findProduct.oldPrice}</strong>`;

priceOptions.append(price1, price2);

// Quantity
let quantity = document.createElement("div");
quantity.className = "quantity-selector";

let minus = document.createElement("button");
minus.className = "btn-minus";
minus.textContent = "-";

let input = document.createElement("input");
input.type = "number";
input.value = "1";
input.min = "1";

let plus = document.createElement("button");
plus.className = "btn-plus";
plus.textContent = "+";


plus.addEventListener("click", () => {
    let value = parseInt(input.value);
    input.value = value + 1;
});

minus.addEventListener("click", () => {
    let value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
});

quantity.append(minus, input, plus);


let sizeColor = document.createElement("div");
sizeColor.className = "size_color";

let sizeSelector = document.createElement("div");
sizeSelector.className = "size-selector";
let sizeLabel = document.createElement("span");
sizeLabel.textContent = "Size";
let sizeButtons = document.createElement("div");
["XS", "S", "M"].forEach(size => {
    let btn = document.createElement("button");
    btn.textContent = size;
    sizeButtons.appendChild(btn);
});
sizeSelector.append(sizeLabel, sizeButtons);

let colorSelector = document.createElement("div");
colorSelector.className = "color-selector";
let colorLabel = document.createElement("span");
colorLabel.textContent = "Color";
let colorOptions = document.createElement("div");
["orange", "green", "blue", "pink"].forEach(color => {
    let span = document.createElement("span");
    span.className = `color ${color}`;
    colorOptions.appendChild(span);
});
colorSelector.append(colorLabel, colorOptions);

sizeColor.append(sizeSelector, colorSelector);


let buttons = document.createElement("div");
buttons.className = "buttons";

let addToCart = document.createElement("button");
addToCart.className = "add-to-cart";
addToCart.textContent = "Add to cart";

addToCart.addEventListener("click", () => {
    addBasket(findProduct);
});

function addBasket(findProduct) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find((user) => user.isLogined == true);

    if (!currentUser) {
        alert("Please login to add to basket");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);
        return;
    }

    let userIndex = users.findIndex((user) => user.id == currentUser.id);
    let basket = currentUser.basket || [];

    let existProduct = basket.find((product) => product.id == findProduct.id);
    if (!existProduct) {

        basket.push({ ...findProduct, count: 1 });
    } else {
        existProduct.count += 1;
    }

    users[userIndex].basket = basket;
    localStorage.setItem("users", JSON.stringify(users));
    toast("Product add seccessfuly");
    basketCount();
}

// function basketCount() {
//     let users = JSON.parse(localStorage.getItem("users")) || [];
//     let currentUser = users.find((user) => user.isLogined == true);
//     if (!currentUser) return;

//     let result = currentUser.basket.reduce(
//         (acc, product) => acc + product.count, 0);

//     let countIcon = document.querySelector(".basketIcon sup");
//     countIcon.textContent = result;

// }

let cashPayment = document.createElement("button");
cashPayment.className = "cash-payment";
cashPayment.textContent = "Cash payment";

buttons.append(addToCart, cashPayment);

let whatsappLink = document.createElement("a");
whatsappLink.href = "#";
whatsappLink.className = "whatsapp-order";
whatsappLink.textContent = "WhatsApp Order";

content.append(title, rating, priceOptions, quantity, sizeColor, buttons, whatsappLink);
productWrapper.append(fourimage, mainImage, content);


let tabs = document.createElement("div");
tabs.className = "description-tabs";
let tab1 = document.createElement("div");
tab1.className = "tab active";
tab1.textContent = "Product Description";
let tab2 = document.createElement("div");
tab2.className = "tab";
tab2.textContent = "Reviews (3)";
tabs.append(tab1, tab2);

let description = document.createElement("div");
description.className = "description-text";
let descText = document.createElement("p");
descText.textContent = findProduct.description;
description.appendChild(descText);


row.append(productWrapper, tabs, description);
container.append(homeImg, row);
productContainer.appendChild(container);


});

let toast = (text) => {
    Toastify({
        text: `${text}`,
        duration: 3000,
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b,rgb(87, 132, 183))",
        },
        onClick: function () { }
    }).showToast();
};

