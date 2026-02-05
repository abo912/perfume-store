let products = JSON.parse(localStorage.getItem('products')) || [];

// عرض المنتجات للزائر
function displayProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    container.innerHTML = "";
    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>السعر: ${product.price}</p>
            <a href="https://wa.me/967XXXXXXXX?text=مرحبًا، أريد شراء هذا المنتج: ${product.name}, السعر: ${product.price}" target="_blank">شراء عبر WhatsApp</a>
        `;
        container.appendChild(div);
    });
}

// معاينة الصورة
const productImage = document.getElementById('productImage');
if(productImage){
    productImage.addEventListener('change', function(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(){
            document.getElementById('preview').src = reader.result;
        }
        reader.readAsDataURL(file);
    });
}

// إضافة / تعديل منتج
const addProductForm = document.getElementById('addProductForm');
if(addProductForm){
    addProductForm.addEventListener('submit', function(e){
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const description = document.getElementById('productDesc').value;
        const price = document.getElementById('productPrice').value;
        const image = document.getElementById('preview').src;

        // تحقق إذا المنتج موجود بالفعل للتعديل
        const existingIndex = products.findIndex(p => p.name === name);
        if(existingIndex !== -1){
            products[existingIndex] = {name, description, price, image};
            alert('تم تعديل المنتج بنجاح!');
        } else {
            products.push({name, description, price, image});
            alert('تم إضافة المنتج!');
        }

        localStorage.setItem('products', JSON.stringify(products));
        displayAdminProducts();
        displayProducts();
        addProductForm.reset();
        document.getElementById('preview').src = "";
    });
}

// عرض المنتجات في صفحة الأدمن مع حذف وتعديل
function displayAdminProducts() {
    const adminContainer = document.getElementById('adminProducts');
    if(!adminContainer) return;
    adminContainer.innerHTML = "";
    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${product.image}" width="100">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p>السعر: ${product.price}</p>
            <button onclick="editProduct(${index})">تعديل</button>
            <button onclick="deleteProduct(${index})">حذف</button>
        `;
        adminContainer.appendChild(div);
    });
}

// تعديل المنتج
function editProduct(index){
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productDesc').value = product.description;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('preview').src = product.image;
}

// حذف المنتج
function deleteProduct(index){
    if(confirm("هل تريد حذف هذا المنتج؟")){
        products.splice(index,1);
        localStorage.setItem('products', JSON.stringify(products));
        displayAdminProducts();
        displayProducts();
    }
}

// تحميل العرض عند التحميل
displayProducts();
displayAdminProducts();