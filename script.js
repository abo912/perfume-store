/* =========================
   معاينة الصورة في الأدمن
========================= */
const productImage = document.getElementById("productImage");
if (productImage) {
  productImage.addEventListener("change", () => {
    const file = productImage.files[0];
    if (file) {
      document.getElementById("preview").src = URL.createObjectURL(file);
    }
  });
}

/* =========================
   إضافة منتج جديد (أدمن)
========================= */
const addProductForm = document.getElementById("addProductForm");

if (addProductForm) {
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const desc = document.getElementById("productDesc").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const qty = document.getElementById("productQty").value.trim();
    const file = productImage.files[0];

    if (!file) {
      alert("يرجى اختيار صورة للمنتج");
      return;
    }

    try {
      // رفع الصورة على Firebase Storage
      const storageRef = storage.ref("products/" + Date.now() + "-" + file.name);
      await storageRef.put(file);
      const imageURL = await storageRef.getDownloadURL();

      // حفظ المنتج في Firestore
      await db.collection("products").add({
        name,
        desc,
        price,
        qty: Number(qty),
        image: imageURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("✅ تم إضافة المنتج بنجاح");
      addProductForm.reset();
      document.getElementById("preview").src = "";

    } catch (err) {
      alert("حدث خطأ: " + err.message);
    }
  });
}

/* =========================
   عرض المنتجات للزوار
========================= */
const productsContainer = document.getElementById("productsContainer");

if (productsContainer) {
  db.collection("products").orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      productsContainer.innerHTML = "";

      snapshot.forEach(doc => {
        const p = doc.data();
        const div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <p><strong>السعر:</strong> ${p.price}</p>
          <p>${p.qty > 0 ? `الكمية المتوفرة: ${p.qty}` : "<span style='color:red'>نفدت الكمية</span>"}</p>
          ${
            p.qty > 0
            ? `<a class="btn" target="_blank" href="https://wa.me/967771347560?text=مرحبًا، أريد شراء ${p.name} بسعر ${p.price}">شراء عبر WhatsApp</a>`
            : ""
          }
        `;

        productsContainer.appendChild(div);
      });
    });
}

/* =========================
   عرض المنتجات في صفحة الأدمن
========================= */
const adminProducts = document.getElementById("adminProducts");

if (adminProducts) {
  db.collection("products").orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      adminProducts.innerHTML = "";

      snapshot.forEach(doc => {
        const p = doc.data();
        const div = document.createElement("div");
        div.className = "admin-product";

        div.innerHTML = `
          <img src="${p.image}" width="100">
          <h4>${p.name}</h4>
          <p>${p.desc}</p>
          <p>السعر: ${p.price}</p>
          <p>الكمية: ${p.qty}</p>
          <button onclick="deleteProduct('${doc.id}')">حذف</button>
        `;

        adminProducts.appendChild(div);
      });
    });
}

/* =========================
   حذف منتج (أدمن)
========================= */
async function deleteProduct(id) {
  if (!confirm("هل أنت متأكد من حذف المنتج؟")) return;

  try {
    await db.collection("products").doc(id).delete();
    alert("🗑️ تم حذف المنتج");
  } catch (err) {
    alert("حدث خطأ: " + err.message);
  }
}
