const container = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function getCategories() {
  const products = getProducts();
  console.log("products", products);
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  return categories;
}

function displayProducts(data) {
  container.innerHTML = "";

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  data.forEach((product) => {
    const isFavorite = wishlist.includes(product.id) ? "active" : "";

    container.innerHTML += `
            <div class="card">
                <div class="img-box">
                    <img src="images/${product.image}.webp" alt="${product.name}">
                    <div class="overlay-icons">
                        <button class="icon-btn wish-icon ${isFavorite}" onclick="toggleWishlist(${product.id})">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <button class="icon-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
                <div class="info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price} ج.م</p>
                </div>
            </div>
        `;
  });
}

function filterProducts(category) {
  const products = getProducts();
  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter((p) => p.category === category);
    displayProducts(filtered);
  }
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const products = getProducts();

  const searchedProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(value);
  });

  displayProducts(searchedProducts);
});

function toggleWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter((id) => id !== productId);
  } else {
    wishlist.push(productId);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateCounters();
  displayProducts(getProducts());
}

function updateCounters() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const cartBadge = document.getElementById("cart-count");
  const wishBadge = document.getElementById("wish-count");

  if (cartBadge) cartBadge.innerText = cart.length;
  if (wishBadge) wishBadge.innerText = wishlist.length;
}
updateCounters();

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCounters();

  alert("Product added to cart");
}

function updateCounters() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const cartCount = document.getElementById("cart-count");
  const wishCount = document.getElementById("wish-count");

  if (cartCount) cartCount.innerText = cart.length;
  if (wishCount) wishCount.innerText = wishlist.length;
}

displayProducts(getProducts());
updateCounters();
