var produtNameInput = document.getElementById("productName");
var produtPriceInput = document.getElementById("ProductPrice");
var produtcCategoryInput = document.getElementById("ProductCategory");
var produtdescInput = document.getElementById("ProductDesc");
var productContainer;
var select=0;
if (localStorage.getItem("productList") == null) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem("productList"));
    displayProduct();
}

function addProduct() {
    if (validationForm()) {
        var product = {
            name: produtNameInput.value,
            price: produtPriceInput.value,
            category: produtcCategoryInput.value,
            description: produtdescInput.value
        }
        productContainer.push(product);
        localStorage.setItem("productList", JSON.stringify(productContainer))
        displayProduct();
        clearForm();
    }
    else {
        alert("All Fields required !!")
    }
}

function clearForm() {

    produtNameInput.value = "";
    produtPriceInput.value = "";
    produtcCategoryInput.value = "";
    produtdescInput.value = "";
}

function displayProduct() {
    var timp = "";

    for (var i = 0; i < productContainer.length; i++) {

        timp += `
            <tr>
                <td>${i}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].description}</td>
                <td><button class="btn btn-warning" onclick="update(${i})">update</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
            </tr>`
    }

    document.getElementById("tableId").innerHTML = timp;
}



function validationForm() {
    if (produtNameInput.value != "" && produtPriceInput.value != ""
        && produtcCategoryInput.value != "" && ProductDesc.value != "") {
        return true;
    }
    else {
        return false
    }
}



function search(word) {

    var cartona = "";

    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(word.toLowerCase())
            ||
            productContainer[i].price.toLowerCase().includes(word.toLowerCase())

        ) {
            cartona += `
            <tr>
                <td>${i}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].description}</td>
                <td><button class="btn btn-warning"onclick="update(${i})">update</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
            </tr>`
        }
    }

    document.getElementById("tableId").innerHTML = cartona;

}



function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productContainer));
    displayProduct();
}



function update(index) {
    select = index;
    produtNameInput.value = productContainer[index].name;
    produtPriceInput.value = productContainer[index].price;
    produtcCategoryInput.value = productContainer[index].category;
    produtdescInput.value = productContainer[index].description;

    document.getElementById("addBtn").style.display = 'none';
    document.getElementById("updateBtn").style.display = 'block';
}


function updateProduct() {

    document.getElementById("addBtn").style.display = 'block';
    document.getElementById("updateBtn").style.display = 'none';

    productContainer[select].name=produtNameInput.value
    productContainer[select].price=produtPriceInput.value
    productContainer[select].category=produtcCategoryInput.value
    productContainer[select].description=produtdescInput.value
    localStorage.setItem("productList", JSON.stringify(productContainer));
    displayProduct();
    clearForm();

}
