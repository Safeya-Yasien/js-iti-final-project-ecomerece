const ordersTable = document.getElementById("orders-table");
const deleteAllBtn = document.querySelector(".delete-all");
const toast = document.querySelector(".toast");

function displayOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersTable = document.getElementById("orders-table");

  ordersTable.innerHTML = "";

  orders.forEach((order, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${order.customerName}</td>
    <td>${order.items}</td>
    <td>${order.totalAmount}</td>
    <td>${order.status}</td>

    <td>
      <button class="btn btn-primary" >Edit</button>
      <button class="btn btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
    </td>
  `;
    ordersTable.appendChild(row);
  });
}

function deleteOrder(id) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const orderIndex = orders.findIndex((order) => order.id === id);
  orders.splice(orderIndex, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  displayOrders();
}

deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("orders");
  displayOrders();
});

function editOrder(id) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const orderIndex = orders.findIndex((order) => order.id === id);
  console.log("orderIndex", orderIndex);
}

// displayOrders();
