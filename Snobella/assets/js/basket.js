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