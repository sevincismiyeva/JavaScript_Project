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
    productContainer.innerHTML = `
    <div class="container detail">
        <img src="./assets/images/home.png" class="shoulderbag" alt="Shoulderbag">
        <div class="row">
            <div class="product-container">
                <div class="fourimage">
                    <i class="fa-solid fa-chevron-up"></i>
                    <img src="${findProduct.image}" alt="Image 1">
                    <img src="${findProduct.image}" alt="Image 2">
                    <img src="${findProduct.image}" alt="Image 3">
                    <img src="${findProduct.image}" alt="Image 4">
                    <i class="fa-solid fa-chevron-down"></i>
                </div>

                <div class="main-image">
                    <div class="discount-badge">30%</div>
                    <i class="fa-regular fa-heart wishlist-icon"></i>
                    <img src="${findProduct.image}" alt="Main Product Image">
                </div>

                <div class="product-content">
                    <h1>${findProduct.title}</h1>
                    <div class="rating">
                        <img src="./assets/images/stars.png" alt="Stars Rating">
                    </div>

                    <div class="price-options">
                        <button>2-9 pieces <strong>US $${findProduct.price}</strong></button>
                        <button>10-49 pieces <strong>US $${findProduct.oldPrice }</strong></button>
                        
                    </div>

                    <div class="quantity-selector">
                            <button class="btn-minus">-</button>
                            <input type="number" value="1" min="1"/>
                            <button class="btn-plus">+</button>
                        </div>

                    <div class="size_color">
                        <div class="size-selector">
                            <span>Size</span>
                            <div>
                                <button>XS</button>
                                <button>S</button>
                                <button>M</button>
                            </div>
                        </div>

                        <div class="color-selector">
                            <span>Color</span>
                            <div>
                                <span class="color orange"></span>
                                <span class="color green"></span>
                                <span class="color blue"></span>
                                <span class="color pink"></span>
                            </div>
                        </div>
                    </div>

                    <div class="buttons">
                        <button class="add-to-cart">Add to cart</button>
                        <button class="cash-payment">Cash payment</button>
                    </div>

                    <a href="#" class="whatsapp-order">WhatsApp Order</a>
                </div>
            </div>

            <!-- Product Description and Reviews Tabs -->
            <div class="description-tabs">
                <div class="tab active">Product Description</div>
                <div class="tab">Reviews (3)</div>
            </div>

            <div class="description-text">
                <p>${findProduct.description}</p>
            </div>
        </div>
    </div>
`;
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

