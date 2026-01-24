const addBtn = document.getElementById("add-btn");
const form = document.getElementById("category-form");
const categoriesView = document.getElementById("categories-view");
const cancelBtn = document.getElementById("cancel-btn");
const addCategoryForm = document.getElementById("add-category-form");
const toast = document.querySelector(".toast");
const toastContent = document.querySelector(".toast-content");
const deleteAllBtn = document.querySelector(".delete-all");
const addCategoryFormTitle = document.querySelector(".add-category-form-title");

const categoryName = document.getElementById("name");
const categoryStatus = document.getElementById("status");
const categoryDescription = document.getElementById("description");

let mode = "add";
let updatedCategoryId;

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
  if (mode === "add") {
    addCategory();
  } else {
    updateCategory();
  }
});

function addCategory() {
  if (
    categoryName.value.trim() &&
    categoryDescription.value.trim() &&
    categoryStatus.value.trim()
  ) {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories.push({
      id: categories.length + 1,
      name: categoryName.value,
      status: categoryStatus.value,
      description: categoryDescription.value,
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
      <button class="btn btn-primary" onclick="editCategory(${category.id})">Edit</button>
      <button class="btn btn-danger" onclick="deleteCategory(${category.id})">Delete</button>
    </td>
  `;
    categoriesTable.appendChild(row);
  });
}

function deleteCategory(id) {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const categoryIndex = categories.findIndex((category) => category.id === id);

  const confirmMessage = confirm(
    "Are you sure you want to delete this category?",
  );
  if (confirmMessage) {
    categories.splice(categoryIndex, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    displayCategories();
  }
}

deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("categories");
  displayCategories();
});

function editCategory(id) {
  mode = "edit";
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const categoryIndex = categories.findIndex((category) => category.id === id);

  addCategoryForm.classList.remove("hidden");
  categoriesView.classList.add("hidden");

  addCategoryFormTitle.innerHTML = "Edit Category";

  const category = categories[categoryIndex];

  categoryName.value = category.name;
  categoryDescription.value = category.description;
  categoryStatus.value = category.status;

  updatedCategoryId = category.id;
}

function updateCategory() {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  if (
    categoryName.value.trim() &&
    categoryDescription.value.trim() &&
    categoryStatus.value.trim()
  ) {
    categories[updatedCategoryId - 1] = {
      id: updatedCategoryId,
      name: categoryName.value,
      description: categoryDescription.value,
      status: categoryStatus.value,
    };

    localStorage.setItem("categories", JSON.stringify(categories));
    toastContent.innerHTML = "Category updated successfully";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
    addCategoryForm.reset();
  }
}

const defaultCategories = [
  {
    id: 1,
    name: "Men",
    status: "Active",
    description: "Products for men",
  },
  {
    id: 2,
    name: "Women",
    status: "Active",
    description: "Products for women",
  },
  {
    id: 3,
    name: "Children",
    status: "Active",
    description: "Products for children",
  },
];

function initCategories() {
  const categories = JSON.parse(localStorage.getItem("categories"));

  if (!products || products.length === 0) {
    localStorage.setItem("categories", JSON.stringify(defaultCategories));
  }
}
initCategories();
displayCategories();
