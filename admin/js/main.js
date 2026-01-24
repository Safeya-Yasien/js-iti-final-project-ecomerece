const productsCount = document.getElementById("products-count");
const categoriesCount = document.getElementById("categories-count");
const ordersCount = document.getElementById("orders-count");
const pendingOrdersCount = document.getElementById("pending-orders-count");
const totalRevenueCount = document.getElementById("total-revenue-count");

function updateDashboard() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  productsCount.innerText = products.length;
  categoriesCount.innerText = categories.length;
  ordersCount.innerText = orders.length;

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  pendingOrdersCount.innerText = pendingOrders;

  const revenue = orders
    .filter((o) => o.status.toLowerCase() === "confirmed")
    .reduce((sum, o) => sum + parseFloat(o.total), 0);
  totalRevenueCount.innerText = `$${revenue.toFixed(2)}`;
}

updateDashboard();
