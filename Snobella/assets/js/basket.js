document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users"));

    let currentUser = users.find((user) => user.isLogined == true);

    let userIndex = users.findIndex((user) => user.id == currentUser.id)

    let basket = currentUser.basket;


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
            let favImg = document.createElement("img");
            favImg.src = "./assets/images/favorite.png";
            favBtn.appendChild(favImg);

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

    createBasketItem();
    totalPrice();



    let basketContainer = document.querySelector(".basket");
    basketContainer.appendChild(clearBtn);
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