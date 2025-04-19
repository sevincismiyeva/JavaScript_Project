document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let currentUser = users.find((user) => user.isLogined == true);


    if (!currentUser) {
        toast("Please login to access your wishlist.");
        setTimeout(() => {
            window.location.href = "login.html"; 
        }, 2000);
        return; 
    }

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

            heartIcon.addEventListener("click", () => {
                toggleUserWishlist(item.id, heartIcon);
            });

            // Image
            let img = document.createElement("img");
            img.classList.add("product-img");
            img.src = item.image;

            // Stars
            let stars = document.createElement("div");
            stars.classList.add("stars");
            for (let i = 0; i < 5; i++) {
                let star = document.createElement("i");
                star.classList.add("fa-solid", "fa-star");
                stars.appendChild(star);
            }

            // Title
            let title = document.createElement("p");
            title.classList.add("product-title");
            title.textContent = item.title.slice(0, 60) + "...";

            // Price
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

            
            let removeBtn = document.createElement("button");
            removeBtn.classList.add("btn", "btn-danger","remove-btn");
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

            }, 1500);
        }

        
    }

    createWishlistItem();

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