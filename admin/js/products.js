const addBtn = document.getElementById("add-btn");
const form = document.getElementById("product-form");
const productsView = document.getElementById("products-view");
const cancelBtn = document.getElementById("cancel-btn");
const addProductForm = document.getElementById("add-product-form");
const toast = document.querySelector(".toast");
const toastContent = document.querySelector(".toast-content");
const deleteAllBtn = document.querySelector(".delete-all");

addBtn.addEventListener("click", () => {
  addProductForm.classList.remove("hidden");
  productsView.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
  addProductForm.classList.add("hidden");
  productsView.classList.remove("hidden");
  displayProducts();
});

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
});

function addProduct() {
  const productName = document.getElementById("name").value;
  const productPrice = document.getElementById("price").value;
  const productStock = document.getElementById("stock").value;
  const productCategory = document.getElementById("category").value;
  const productDescription = document.getElementById("description").value;

  if (
    productName.trim() &&
    productPrice.trim() &&
    productStock.trim() &&
    productCategory.trim() &&
    productDescription.trim()
  ) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({
      id: products.length + 1,
      name: productName,
      price: productPrice,
      stock: productStock,
      category: productCategory,
      description: productDescription,
    });

    localStorage.setItem("products", JSON.stringify(products));
    toastContent.innerHTML = "Product added successfully";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
    addProductForm.reset();
    displayProducts();
  }
}

function displayProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productsTable = document.getElementById("products-table");

  productsTable.innerHTML = "";

  products.forEach((product, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.stock}</td>
    <td>${product.category}</td>
    <td class="description">${product.description}</td>
    <td>
      <button class="btn btn-primary" >Edit</button>
      <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
    </td>
  `;
    productsTable.appendChild(row);
  });
}

function deleteProduct(id) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("products");
  displayProducts();
});

function editProduct(id) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex((product) => product.id === id);
  console.log("productIndex", productIndex);
}

displayProducts();
