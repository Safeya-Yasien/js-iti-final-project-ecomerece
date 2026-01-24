function getCart() {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    document.getElementById("cart-items").innerHTML = `<p>Cart is empty</p>`;
    return;
  }
  displayCart(cart);
}

function displayCart(cart) {
  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const cartTotal = document.getElementById("cart-total");

  let html = "";
  let total = 0;

  for (const item of cart) {
    const product = allProducts.find((p) => p.id === item.id);
    if (product) {
      total += product.price * item.quantity;
      html += `
           <div class="cart-item">
          <div class="cart-img">
            <img src="images/${product.image}.webp" alt="${product.name}">
          </div>
          <div class="item-details">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
          </div>
          <div class="item-qty">
            <button class="qty-btn" onclick="updateQty(${product.id}, -1)">-</button>
            <input type="number" id="qty-${product.id}" value="${item.quantity}" min="1">
            <button class="qty-btn" onclick="updateQty(${product.id}, 1)">+</button>
          </div>
          <div class="cart-info">
            <button class="remove-btn" onclick="removeCart(${product.id})">Remove</button>
          </div>
        </div>
      `;
    }
  }
  cartItems.innerHTML = html;
  cartTotal.innerText = total.toFixed(2);
  cartSummary.classList.remove("hidden");
}

function deleteAll() {
  localStorage.removeItem("cart");
  document.getElementById("content").innerHTML = `<p>Cart is empty</p>`;
}

function removeCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  getCart();
}

function updateQty(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((item) => {
    if (item.id === productId) {
      item.quantity += change;
      if (item.quantity < 1) item.quantity = 1;
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  getCart();
}

getCart();
