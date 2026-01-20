const addBtn = document.getElementById("add-btn");
const form = document.getElementById("product-form");
const productsView = document.getElementById("products-view");
const cancelBtn = document.getElementById("cancel-btn");
const addProductForm = document.getElementById("add-product-form");
const toast = document.querySelector(".toast");
const toastContent = document.querySelector(".toast-content");

addBtn.addEventListener("click", () => {
  addProductForm.classList.remove("hidden");
  productsView.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
  addProductForm.classList.add("hidden");
  productsView.classList.remove("hidden");
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
  }
}
