const productsCount = document.getElementById("products-count");
const categoriesCount = document.getElementById("categories-count");
const ordersCount = document.getElementById("orders-count");

function displayProductsLength() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  productsCount.innerHTML = products.length;
}

function displayCategoriesLength() {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  categoriesCount.innerHTML = categories.length;
}

function displayOrdersLength() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  ordersCount.innerHTML = orders.length;
}
displayProductsLength();
displayCategoriesLength();
displayOrdersLength();
