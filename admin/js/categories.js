const addBtn = document.getElementById("add-btn");
const form = document.getElementById("category-form");
const categoriesView = document.getElementById("categories-view");
const cancelBtn = document.getElementById("cancel-btn");
const addCategoryForm = document.getElementById("add-category-form");
const toast = document.querySelector(".toast");
const toastContent = document.querySelector(".toast-content");
const deleteAllBtn = document.querySelector(".delete-all");

addBtn.addEventListener("click", () => {
  addCategoryForm.classList.remove("hidden");
  categoriesView.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
  addCategoryForm.classList.add("hidden");
  categoriesView.classList.remove("hidden");
  displayCategories();
});

addCategoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addCategory();
});

function addCategory() {
  const categoryName = document.getElementById("name").value;
  const categoryStatus = document.getElementById("status").value;
  const categoryDescription = document.getElementById("description").value;

  if (
    categoryName.trim() &&
    categoryDescription.trim() &&
    categoryStatus.trim()
  ) {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories.push({
      id: categories.length + 1,
      name: categoryName,
      status: categoryStatus,
      description: categoryDescription,
    });

    localStorage.setItem("categories", JSON.stringify(categories));
    toastContent.innerHTML = "Category added successfully";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
    addCategoryForm.reset();
    displayCategories();
  }
}

function displayCategories() {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const categoriesTable = document.getElementById("categories-table");

  categoriesTable.innerHTML = "";

  categories.forEach((category, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${category.name}</td>
    <td>${category.status}</td>
    <td class="description">${category.description}</td>
    <td>
      <button class="btn btn-primary" >Edit</button>
      <button class="btn btn-danger" onclick="deleteCategory(${category.id})">Delete</button>
    </td>
  `;
    categoriesTable.appendChild(row);
  });
}

function deleteCategory(id) {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const categoryIndex = categories.findIndex((category) => category.id === id);
  categories.splice(categoryIndex, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
  displayCategories();
}

deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("categories");
  displayCategories();
});

function editCategory(id) {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const categoryIndex = categories.findIndex((category) => category.id === id);
  console.log("categoryIndex", categoryIndex);
}

displayCategories();
