document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users"));

    let currentUser = users.find((user) => user.isLogined == true);

    let userIndex = users.findIndex((user) => user.id == currentUser.id)

    let basket = currentUser.basket;

    if (!currentUser) {
        toast("Please login to access your wishlist.");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
        return;
    }


    let login = document.querySelector(".login");
    let register = document.querySelector(".register");
    let logout = document.querySelector(".logout");


    function updateUserStatus() {
        if (currentUser) {
            login.classList.add("d-none");
            register.classList.add("d-none");
            logout.classList.remove("d-none");

        } else {
            login.classList.remove("d-none");
            register.classList.remove("d-none");
            logout.classList.add("d-none");
        }
    };

    let usernameBtn = document.querySelector(".username");
    usernameBtn.textContent = currentUser?.username;



    let clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Basket";
    clearBtn.classList.add("btn", "btn-success", "clear-basket");
    clearBtn.style.margin = "20px auto";
    clearBtn.style.display = "block";

    clearBtn.addEventListener("click", () => {
        if (basket.length === 0) {
            toast("Basket is already empty");
            return;
        }

        if (confirm("Are you sure you want to clear the basket?")) {
            basket = [];
            users[userIndex].basket = basket;
            localStorage.setItem("users", JSON.stringify(users));
            createBasketItem();
            totalPrice();
            toast("All products removed from basket");
        }
    });


    function createBasketItem() {
        let users = JSON.parse(localStorage.getItem("users"));
    let currentUser = users.find(user => user.isLogined === true);
    let basket = currentUser?.basket || [];
    let userIndex = users.findIndex(user => user.id === currentUser?.id);


        let basketLeft = document.querySelector(".basket_left");
        basketLeft.innerHTML = "";

        basket.forEach((product) => {

            let basketCard = document.createElement("div");
            basketCard.classList.add("basket_card", "basket-item");


            let imgDiv = document.createElement("div");
            imgDiv.classList.add("basket_img");
            let img = document.createElement("img");
            img.src = product.image;
            img.alt = "Product Image";
            imgDiv.appendChild(img);


            let contentDiv = document.createElement("div");
            contentDiv.classList.add("basket_content");


            let titleDiv = document.createElement("div");
            titleDiv.classList.add("title");

            let h3 = document.createElement("h3");
            h3.textContent = product.title;

            let priceSpan = document.createElement("span");
            priceSpan.classList.add("price");
            priceSpan.textContent = `US $${(product.price * product.count).toFixed(2)}`;

            titleDiv.appendChild(h3);
            titleDiv.appendChild(priceSpan);


            let sizeColor = document.createElement("p");
            sizeColor.textContent = `Size: ${product.size}   Color: ${product.color}`;

            let delivery = document.createElement("p");
            delivery.textContent = `Delivery: 25-32 days`;

            let quality = document.createElement("p");
            quality.textContent = "Quality";


            let countArea = document.createElement("div");
            countArea.classList.add("count-area");

            let minusBtn = document.createElement("button");
            minusBtn.classList.add("minus-btn");
            minusBtn.textContent = "-";
            if (product.count <= 1) minusBtn.setAttribute("disabled", "true");

            let countElem = document.createElement("p");
            countElem.classList.add("count");
            countElem.textContent = product.count;

            let plusBtn = document.createElement("button");
            plusBtn.classList.add("plus-btn");
            plusBtn.textContent = "+";


            minusBtn.addEventListener("click", () =>
                decrement(product.id, countElem, minusBtn)
            );
            plusBtn.addEventListener("click", () =>
                incerement(product.id, countElem, minusBtn)
            );

            countArea.append(minusBtn, countElem, plusBtn);


            let actionsDiv = document.createElement("div");
            actionsDiv.classList.add("basket_actions");

            let favBtn = document.createElement("button");
            favBtn.classList.add("action_btn");
            favBtn.style.display = "flex";
            favBtn.style.alignItems = "center";
            favBtn.style.gap = "8px";
            favBtn.style.border = "none";
            favBtn.style.background = "transparent";
            favBtn.style.cursor = "pointer";


            let heartIcon = document.createElement("i");
            heartIcon.classList.add("fa-regular", "fa-heart", "card-heart","wishlist-icon");
           

            if (currentUser.wishlist.some(w => w.id === product.id)) {
                heartIcon.classList.add("fa-solid");
                heartIcon.style.color = "red";
            } else {
                heartIcon.classList.add("fa-regular");
                heartIcon.style.color = "red";
            }


            let favText = document.createElement("span");
            favText.textContent = "Favorite";
            favText.style.fontSize = "14px";
            favText.style.color = "#333";

            favBtn.append(heartIcon, favText);

            favBtn.addEventListener("click", () => {
                let userWishlist = currentUser.wishlist || [];
                let isInWishlist = userWishlist.some(p => p.id === product.id);
                let userIndex = users.findIndex(u => u.id === currentUser.id);

                if (isInWishlist) {
                    userWishlist = userWishlist.filter(p => p.id !== product.id);
                    toast("Removed from wishlist");
                    heartIcon.classList.remove("fa-solid");
                    heartIcon.classList.add("fa-regular");
                    
                } else {
                    userWishlist.push(product);
                    toast("Added to wishlist");
                    heartIcon.classList.remove("fa-regular");
                    heartIcon.classList.add("fa-solid");
                    heartIcon.style.color = "red";
                }

                users[userIndex].wishlist = userWishlist;
                localStorage.setItem("users", JSON.stringify(users));
            });


            let removeBtn = document.createElement("button");
            removeBtn.classList.add("action_btn");
            let removeImg = document.createElement("img");
            removeImg.src = "./assets/images/remove.png";
            removeBtn.appendChild(removeImg);

            removeBtn.addEventListener("click", () => removeProduct(product.id));


            

            actionsDiv.append(favBtn, removeBtn);


            contentDiv.append(titleDiv, sizeColor, delivery, quality, countArea, actionsDiv);


            basketCard.append(imgDiv, contentDiv);


            basketLeft.appendChild(basketCard);

            let confirmBtn = document.querySelector(".confirm_btn");

confirmBtn.addEventListener("click", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.isLogined === true);
    if (!currentUser) return;

    let basket = currentUser.basket || [];

    if (basket.length === 0) {
        toast("Səbət boşdur!"); 
    } else {
        console.log("Səbətdəki məhsullar:", basket);
    }
});

           
        });

        let confirmBtn = document.querySelector(".confirm_btn");

confirmBtn.addEventListener("click", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.isLogined === true);
    if (!currentUser) return;

    let basket = currentUser.basket || [];

    if (basket.length === 0) {
        toast("Sebet bosdur");
    } else {
        console.log("Sebetdeki mehsul:", basket);
    }
});

       
        basketLeft.appendChild(clearBtn);
    }
   



    function incerement(productId, countElem, minusBtnElem) {

        let existProduct = basket.find((product) => product.id == productId);
        if (existProduct) {
            existProduct.count++;
            countElem.textContent = existProduct.count;

            if (existProduct.count > 1) {
                minusBtnElem.removeAttribute("disabled");
            }

            users[userIndex].basket = basket;
            localStorage.setItem("users", JSON.stringify(users));

            let priceElem = countElem.closest(".basket-item").querySelector(".price");
            priceElem.textContent = "$" + (existProduct.price * existProduct.count).toFixed(2);
        }
        totalPrice();
    }

    function decrement(productId, countElem, minusBtnElem) {

        let existProduct = basket.find((product) => product.id == productId);
        if (existProduct) {

            if (existProduct.count <= 1) {
                minusBtnElem.setAttribute("disabled", "true");
                return;
            }

            existProduct.count--;
            countElem.textContent = existProduct.count;

            if (existProduct.count === 1) {
                minusBtnElem.setAttribute("disabled", "true");
            }

            users[userIndex].basket = basket;
            localStorage.setItem("users", JSON.stringify(users));

            let priceElem = countElem.closest(".basket-item").querySelector(".price");
            priceElem.textContent = "$" + (existProduct.price * existProduct.count).toFixed(2);
        }
        totalPrice();
    }

    function totalPrice() {
        let paymentCash = 0;
        basket.forEach((product) => {
            paymentCash += product.count * product.price;
        });

        let totalElement = document.querySelector(".total-price");
        totalElement.textContent = paymentCash.toFixed(2);
    }

    function removeProduct(productId) {
        let existProductIndex = basket.findIndex(
            (product) => product.id == productId);

        if (existProductIndex != -1) {
            basket.splice(existProductIndex, 1);
            users[userIndex].basket = basket;
            localStorage.setItem("users", JSON.stringify(users));
            toast("Product deleted successfully");
        }
        createBasketItem();
        totalPrice();
    }

    function basketCount() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let currentUser = users.find((user) => user.isLogined == true);
        if (!currentUser) return;
    
        let result = currentUser.basket.reduce(
            (acc, product) => acc + product.count, 0);
    
        let countIcon = document.querySelector(".btn sup");
        countIcon.textContent = result;

    
    }
    
    basketCount();
    updateUserStatus();
    createBasketItem();
    totalPrice();

});

let toast = (text) => {
    Toastify({
        text: `${text}`,
        duration: 3000,
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right,rgb(218, 164, 164),rgb(203, 101, 101))",
        },
        onClick: function () { }
    }).showToast();
};