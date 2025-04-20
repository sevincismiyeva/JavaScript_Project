document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let currentUser = users.find((user) => user.isLogined == true);

    let usernameBtn = document.querySelector(".username");
    usernameBtn.textContent = currentUser?.username;

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

    let favRight = document.querySelector(".fav_right");
    let clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Wishlist";
    clearBtn.classList.add("btn", "btn-success", "clear-wishlist");
    clearBtn.style.margin = "20px auto";
    clearBtn.style.display = "block";
    clearBtn.style.textAlign = "center"

    clearBtn.addEventListener("click", () => {
        let userIndex = users.findIndex(user => user.id === currentUser.id);
        let wishlist = currentUser.wishlist || [];

        if (wishlist.length === 0) {
            toast("Wishlist is already empty");
            return;
        }

        if (confirm("Are you sure you want to clear the wishlist?")) {
            wishlist = [];
            users[userIndex].wishlist = wishlist;
            localStorage.setItem("users", JSON.stringify(users));
            toast("All products removed from wishlist");

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    });


    favRight.appendChild(clearBtn)


    let userWishlist = currentUser.wishlist;

    function createWishlistItem() {

        let wishlistContainer = document.querySelector(".cards");

        userWishlist.forEach(item => {
            let productCard = document.createElement("div");
            productCard.classList.add("product-card");


            let badge = document.createElement("div");
            badge.className = "discount-badge";

            if (!isNaN(item.discount)) {
                badge.textContent = `${item.discount} %`;
                badge.style.backgroundColor = "#DF4244";
            } else {
                badge.textContent = "New";
                badge.style.backgroundColor = "#4CAF50";
            }

            productCard.appendChild(badge);



            let heartIcon = document.createElement("i");
            heartIcon.classList.add("fa-heart", "wishlist-icon");
            if (currentUser.wishlist.some(w => w.id === item.id)) {
                heartIcon.classList.add("fa-solid");
            } else {
                heartIcon.classList.add("fa-regular");
            }



            let img = document.createElement("img");
            img.classList.add("product-img");
            img.src = item.image;


            let stars = document.createElement("div");
            stars.classList.add("stars");
            for (let i = 0; i < 5; i++) {
                let star = document.createElement("i");
                star.classList.add("fa-solid", "fa-star");
                stars.appendChild(star);
            }


            let title = document.createElement("p");
            title.classList.add("product-title");
            title.textContent = item.title.slice(0, 60) + "...";


            let priceDiv = document.createElement("div");
            priceDiv.classList.add("price");

            let currentPrice = document.createElement("span");
            currentPrice.classList.add("current-price");
            currentPrice.textContent = `$${item.price}`;

            let oldPrice = document.createElement("span");
            oldPrice.classList.add("old-price");
            oldPrice.textContent = item.oldPrice ? `From $${item.oldPrice}` : "";

            priceDiv.append(currentPrice, oldPrice);


            let addToCart = document.createElement("button");
            addToCart.classList.add("add-to-cart");
            addToCart.textContent = "Add to card";

            addToCart.addEventListener("click", () => {
                addBasket(item);
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


            let removeBtn = document.createElement("button");
            removeBtn.classList.add("btn", "btn-danger", "remove-btn");
            removeBtn.textContent = "Remove";

            removeBtn.addEventListener("click", () => {
                removeProduct(item.id);
            });


            productCard.append(heartIcon, img, stars, title, priceDiv, addToCart, removeBtn);
            wishlistContainer.appendChild(productCard);
        });

    }

    function removeProduct(productId) {
        let userIndex = users.findIndex((user) => user.id == currentUser.id);

        let productIndex = currentUser.wishlist.findIndex(
            (product) => product.id == productId
        );

        if (productIndex != -1) {
            currentUser.wishlist.splice(productIndex, 1);
            users[userIndex] = currentUser;
            localStorage.setItem("users", JSON.stringify(users));

            toast("Product removed from wishlist...");
            setTimeout(() => {
                window.location.reload();

            }, 1000);
        }


    }

    updateUserStatus();
    createWishlistItem();

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