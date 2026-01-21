- what is JSON.stringify()
  The JSON.stringify() static method converts a JavaScript value to a JSON string

### Main pages

- products.html
  - add new product
  - edit product
  - delete product
  - show all products
- categories.html
  - add new category
  - edit category
  - delete category
  - show all categories
- orders.html
  - add new order
  - edit order
  - delete order
  - show all orders
- index.html
  - show summary of products, categories and orders total count as cards

## proplems i faced in this project and how i solved them

- first when i add product then click on cancel button it show all products in products.html page but duplicate them
  - i solved them by adding productsTable.innerHTML = ""; in displayProducts() function

- why i can't add img using pure js
  - because i can't get the image path from the input file
  - localstorage size is limited to 5mb so i can't store the image in localstorage
  - we can add only the image url in the input file

#### TODO

- edit product
- edit category
- edit order
- confirm delete product
- confirm delete category
- confirm delete order
- handle after login
- handle logout
- logout confirm message
- orders status

<!-- what is event bubling -->
