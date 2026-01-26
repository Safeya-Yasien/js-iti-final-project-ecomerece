const addBtn = document.getElementById("add-btn");
const form = document.getElementById("product-form");
const productsView = document.getElementById("products-view");
const cancelBtn = document.getElementById("cancel-btn");
const addProductForm = document.getElementById("add-product-form");
const toast = document.querySelector(".toast");
const toastContent = document.querySelector(".toast-content");
const deleteAllBtn = document.querySelector(".delete-all");
const addProductFormTitle = document.querySelector(".add-product-form-title");

const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productStock = document.getElementById("stock");
const productCategory = document.getElementById("category");
const productDescription = document.getElementById("description");
const productImage = document.getElementById("image");

let mode = "add";
let updatedProductId;

addBtn.addEventListener("click", () => {
  addProductForm.classList.remove("hidden");
  productsView.classList.add("hidden");
  addProductFormTitle.innerHTML = "Add Product";
});

cancelBtn.addEventListener("click", () => {
  addProductForm.classList.add("hidden");
  productsView.classList.remove("hidden");
  displayProducts();
});

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (mode === "add") {
    addProduct();
  } else {
    updateProduct();
  }
});

productName.addEventListener("input", validateName);
productPrice.addEventListener("input", validatePrice);
productStock.addEventListener("input", validateStock);
productCategory.addEventListener("change", validateCategory);
productDescription.addEventListener("input", validateDescription);
productImage.addEventListener("input", validateImage);

function validateName() {
  if (!productName.value.trim()) {
    document.getElementById("name-error").textContent =
      "Product name is required";
    return false;
  }
  document.getElementById("name-error").textContent = "";
  return true;
}

function validatePrice() {
  if (!productPrice.value.trim() || Number(productPrice.value) <= 0) {
    document.getElementById("price-error").textContent =
      "Price must be greater than 0";
    return false;
  }
  document.getElementById("price-error").textContent = "";
  return true;
}

function validateStock() {
  if (!productStock.value.trim() || Number(productStock.value) < 0) {
    document.getElementById("stock-error").textContent =
      "Stock cannot be negative";
    return false;
  }
  document.getElementById("stock-error").textContent = "";
  return true;
}

function validateCategory() {
  if (!productCategory.value.trim()) {
    document.getElementById("category-error").textContent =
      "Category is required";
    return false;
  }
  document.getElementById("category-error").textContent = "";
  return true;
}

function validateDescription() {
  if (!productDescription.value.trim()) {
    document.getElementById("description-error").textContent =
      "Description is required";
    return false;
  }
  document.getElementById("description-error").textContent = "";
  return true;
}

function validateImage() {
  if (!productImage.value.trim()) {
    document.getElementById("image-error").textContent = "Image is required";
    return false;
  }
  document.getElementById("image-error").textContent = "";
  return true;
}

function validateProduct() {
  return (
    validateName() &&
    validatePrice() &&
    validateStock() &&
    validateCategory() &&
    validateDescription() &&
    validateImage()
  );
}

function addProduct() {
  if (!validateProduct()) return;
  if (
    productName.value.trim() &&
    productPrice.value.trim() &&
    productStock.value.trim() &&
    productCategory.value.trim() &&
    productDescription.value.trim() &&
    productImage.value.trim()
  ) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({
      id: products.length + 1,
      name: productName.value,
      price: productPrice.value,
      stock: productStock.value,
      category: productCategory.value,
      description: productDescription.value,
      image: productImage.value,
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
      <button class="btn btn-primary" onclick="editProduct(${product.id})">Edit</button>
      <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
    </td>
  `;
    productsTable.appendChild(row);
  });
}

function deleteProduct(id) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex((product) => product.id === id);
  const confirmMessage = confirm(
    "Are you sure you want to delete this product?",
  );
  if (confirmMessage) {
    products.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
  }
}

deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("products");
  displayProducts();
});

function editProduct(id) {
  mode = "edit";
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex((product) => product.id === id);

  addProductForm.classList.remove("hidden");
  productsView.classList.add("hidden");

  addProductFormTitle.innerHTML = "Edit Product";

  const product = products[productIndex];

  productName.value = product.name;
  productPrice.value = product.price;
  productStock.value = product.stock;
  productCategory.value = product.category;
  productDescription.value = product.description;
  productImage.value = product.image;

  updatedProductId = product.id;
}

function updateProduct() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (
    productName.value.trim() &&
    productPrice.value.trim() &&
    productStock.value.trim() &&
    productCategory.value.trim() &&
    productDescription.value.trim() &&
    productImage.value.trim()
  ) {
    products[updatedProductId - 1] = {
      id: updatedProductId,
      name: productName.value,
      price: productPrice.value,
      stock: productStock.value,
      category: productCategory.value,
      description: productDescription.value,
      image: productImage.value,
    };

    localStorage.setItem("products", JSON.stringify(products));
    toastContent.innerHTML = "Product updated successfully";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
    addProductForm.reset();
  }
}

const defaultProducts = [
  {
    id: 1,
    name: "Men T-Shirt",
    price: 25,
    stock: 50,
    category: "Men",
    description: "Comfortable cotton t-shirt",
    image: "men-1",
  },
  {
    id: 2,
    name: "Men Jeans",
    price: 45,
    stock: 30,
    category: "Men",
    description: "Slim fit denim jeans",
    image: "men-2",
  },
  {
    id: 3,
    name: "Women Dress",
    price: 60,
    stock: 20,
    category: "Women",
    description: "Elegant evening dress",
    image: "women-1",
  },
  {
    id: 4,
    name: "Women Sneakers",
    price: 80,
    stock: 15,
    category: "Women",
    description: "Sporty and comfortable",
    image: "women-2",
  },
  {
    id: 5,
    name: "Children Hoodie",
    price: 30,
    stock: 25,
    category: "Children",
    description: "Warm and cozy hoodie for children",
    image: "children-1",
  },
  {
    id: 6,
    name: "Children Shorts",
    price: 20,
    stock: 40,
    category: "Children",
    description: "Cool summer shorts",
    image: "children-2",
  },
];

function initProducts() {
  const products = JSON.parse(localStorage.getItem("products"));

  if (!products || products.length === 0) {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
  }
}

initProducts();
displayProducts();
