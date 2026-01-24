window.onload = function() {
    updateDashboard();
    displayOrders();
};
let currentPage = 1; 
let rowsPerPage = 10; 

function displayOrders() {
    let data = localStorage.getItem("orders");
    let orders = JSON.parse(data) || [];

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedOrders = orders.slice(startIndex, endIndex); 

    let tbody = document.getElementById("orders-list");
    tbody.innerHTML = '';

    for (let element of paginatedOrders) {
        let productId = element.items[0].productId;
        let quantity = element.items[0].quantity;
        let statusClass = `status-${element.status}`;
        let isNotPending = element.status !== 'pending' ? 'disabled' : '';

        let inner = `<tr>
                <td>${element.id}</td>
                <td>${element.customer}</td>
                <td>${productId}</td>
                <td>${quantity}</td>
                <td>${element.totalPrice} $</td>
                <td><span class="status ${statusClass}">${element.status}</span></td>
                <td>
                    <button class="action-btn btn-confirm" ${isNotPending} onclick="handleConfirm('${element.id}')">Confirm</button>
                    <button class="action-btn btn-reject" ${isNotPending} onclick="handleReject('${element.id}')">Reject</button>
                    <button class="action-btn btn-delete" onclick="handleDelete('${element.id}')">Delete</button>
                </td>
        </tr>`;
        tbody.innerHTML += inner;
    }

    renderPagination(orders.length);
}
displayOrders()




function handleConfirm(orderId){
    let orders =JSON.parse(localStorage.getItem('orders'));
    let products =JSON.parse(localStorage.getItem('products'));

    let order = orders.find(o => o.id === orderId);

    if (order.status !== 'pending' && order.status !== 'rejected' ) {
        alert("Aleardy had been confirmed");
        return; 
    }
   for (let orderItem of order.items) {
        let product = products.find(p => p.id === orderItem.productId);
        
        if (product && product.stock < orderItem.quantity) {
            alert(`Sorry! Not enough stock for ${product.name}. Available: ${product.stock}`);
            return; // 
        }
    }

    order.status = "confirmed";



    for(let orderItem of order.items){
        let product = products.find( p=> p.id === orderItem.productId);
        if(product){
            product.stock -= orderItem.quantity;
        }
    }

        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("products", JSON.stringify(products));

        displayOrders();
        alert("Order Confirmed and Stock Updated!");
        updateDashboard()
}



function handleReject(orderId){
    let orders = JSON.parse(localStorage.getItem('orders'));
    let order = orders.find(o=> o.id === orderId);
     if (order.status !== 'pending' && order.status === 'confirmed' ) {
        alert("sorry had been confirmed");
        return; 
    }
    if(order){
        order.status = "rejected";
        localStorage.setItem('orders',JSON.stringify(orders));
        displayOrders();
        alert("Order has been rejected.");
    }
updateDashboard()
}

function handleDelete(orderId){
    let orders = JSON.parse(localStorage.getItem('orders'));
    let order = orders.find(o => o.id === orderId);
    if (order.status === 'pending') {
        alert("لا يمكن حذف طلب قيد الانتظار، يجب تأكيده أو رفضه أولاً.");
        return;
    }
    if(confirm("Are you sure , delet the order")){
        let orderFiltration = orders.filter(o=> o.id !== orderId);
        localStorage.setItem("orders",JSON.stringify(orderFiltration));
        displayOrders()
    }
    updateDashboard()
}


function updateDashboard() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let totalCount = orders.length;

    let pendingCount = orders.filter(o => o.status === "pending").length;

    let revenue = orders
        .filter(o => o.status === "confirmed") 
        .reduce((sum, o) => sum + o.totalPrice, 0); 

    document.getElementById("total-orders").innerText = totalCount;
    document.getElementById("pending-orders").innerText = pendingCount;
    document.getElementById("total-revenue").innerText = revenue;
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    let controls = document.getElementById("pagination-controls");
    
    controls.innerHTML = `
        <button onclick="changePage(-1)" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <span>Page ${currentPage} of ${totalPages}</span>
        <button onclick="changePage(1)" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;
}

function changePage(direction) {
    currentPage += direction;
    displayOrders(); 
