const $ = id => document.getElementById(id);

const STORE_DATA = {
  "golden-kitchen": {
    name:"Golden Kitchen",
    tagline:"Luxury burgers and handcrafted desserts.",
    description:"Premium burgers and desserts made with carefully selected ingredients.",
    address:"Alaunstraße 12, 01099 Dresden, Germany",
    hours:"Monday–Sunday: 11:00–22:00",
    logo:""
  },
  "ocean-table": {
    name:"Ocean Table",
    tagline:"Fresh seafood and refined culinary creations.",
    description:"Fresh seafood and elegant culinary creations.",
    address:"Wilsdruffer Straße 8, 01067 Dresden, Germany",
    hours:"Monday–Sunday: 12:00–23:00",
    logo:""
  },
  "sakura-house": {
    name:"Sakura House",
    tagline:"An elegant journey through Japanese cuisine.",
    description:"Japanese cuisine and carefully prepared sushi.",
    address:"Schandauer Straße 35, 01309 Dresden, Germany",
    hours:"Monday–Sunday: 12:00–22:00",
    logo:""
  },
  "citrus-bar": {
    name:"Citrus Bar",
    tagline:"Fresh drinks and vibrant citrus creations.",
    description:"Refreshing drinks and vibrant citrus flavors.",
    address:"Bautzner Straße 21, 01099 Dresden, Germany",
    hours:"Monday–Sunday: 10:00–22:00",
    logo:""
  }
};

let currentStore = $("storeSelector").value;
let currentImage = "";

function productsKey() {
  return "gourmetProducts_" + currentStore;
}

function restaurantKey() {
  return "gourmetRestaurant_" + currentStore;
}

function loadProducts() {
  try {
    return JSON.parse(localStorage.getItem(productsKey())) || [];
  } catch {
    return [];
  }
}

function saveProducts(products) {
  localStorage.setItem(productsKey(), JSON.stringify(products));
}

function loadRestaurant() {
  try {
    return {
      ...STORE_DATA[currentStore],
      ...(JSON.parse(localStorage.getItem(restaurantKey())) || {})
    };
  } catch {
    return STORE_DATA[currentStore];
  }
}

function saveRestaurant(data) {
  localStorage.setItem(restaurantKey(), JSON.stringify(data));
}

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  $(sectionId).classList.add("active");

  document.querySelectorAll(".sidebar a[data-section]").forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.section === sectionId
    );
  });

  if(sectionId === "products") renderTable();
  if(sectionId === "overview") updateStats();
  if(sectionId === "restaurant") fillRestaurantForm();

  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".sidebar a[data-section]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

$("storeSelector").addEventListener("change", e => {
  currentStore = e.target.value;
  resetForm();
  updateStats();
  renderTable();
  fillRestaurantForm();
  updateStoreLink();
});

function updateStoreLink() {
  $("viewStoreLink").href = "store.html?store=" + currentStore;
}

function updateStats() {
  const products = loadProducts();

  $("totalProducts").textContent = products.length;

  $("totalCategories").textContent =
    new Set(products.map(p => p.category)).size;

  const average = products.length
    ? products.reduce((sum,p) => sum + Number(p.price),0) / products.length
    : 0;

  $("averagePrice").textContent = "€" + average.toFixed(2);
}

function renderTable() {
  const products = loadProducts();

  $("productTable").innerHTML = products.map(p => `
    <tr>
      <td>
        <img class="product-thumb"
          src="${p.image || ""}" alt="">
      </td>
      <td>
        <strong>${escapeHTML(p.name)}</strong>
        <div class="small muted">
          ${escapeHTML(p.description)}
        </div>
      </td>
      <td><span class="badge badge-gold">${escapeHTML(p.category)}</span></td>
      <td>€${Number(p.price).toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-outline-gold me-1"
          onclick="editProduct('${p.id}')">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger"
          onclick="deleteProduct('${p.id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join("");

  $("emptyProducts").classList.toggle("d-none", products.length > 0);
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  })[char]);
}

function newProduct() {
  resetForm();
  showSection("addProduct");
}

function resetForm() {
  $("productForm").reset();
  $("editId").value = "";
  $("formHeading").textContent = "Add New Product";
  $("imagePreview").classList.add("d-none");
  $("imagePreview").src = "";
  currentImage = "";
}

$("productImage").addEventListener("change", e => {
  const file = e.target.files[0];

  if(!file) return;

  if(!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    e.target.value = "";
    return;
  }

  if(file.size > 3 * 1024 * 1024) {
    alert("Please choose an image smaller than 3 MB.");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    currentImage = reader.result;
    $("imagePreview").src = currentImage;
    $("imagePreview").classList.remove("d-none");
  };

  reader.readAsDataURL(file);
});

$("productForm").addEventListener("submit", e => {
  e.preventDefault();

  const products = loadProducts();
  const editId = $("editId").value;

  const existing = products.find(p => String(p.id) === editId);

  const product = {
    id: editId || String(Date.now()),
    name: $("productName").value.trim(),
    category: $("productCategory").value,
    price: Number($("productPrice").value),
    description: $("productDescription").value.trim(),
    availability: $("productAvailability").value,
    image: currentImage || existing?.image || ""
  };

  if(!product.name || !product.category ||
     !product.description || !Number.isFinite(product.price) ||
     product.price < 0) {
    alert("Please complete all required fields.");
    return;
  }

  if(editId) {
    const index = products.findIndex(p => String(p.id) === editId);
    if(index !== -1) products[index] = product;
  } else {
    products.push(product);
  }

  try {
    saveProducts(products);
  } catch(error) {
    alert("Could not save the product. The browser may be out of storage space. Try a smaller image.");
    return;
  }

  resetForm();
  updateStats();
  renderTable();
  showSection("products");
  alert("Product saved successfully!");
});

function editProduct(id) {
  const product = loadProducts().find(p => String(p.id) === String(id));

  if(!product) return;

  $("editId").value = product.id;
  $("productName").value = product.name;
  $("productCategory").value = product.category;
  $("productPrice").value = product.price;
  $("productDescription").value = product.description;
  $("productAvailability").value = product.availability || "Available";

  currentImage = product.image || "";

  if(currentImage) {
    $("imagePreview").src = currentImage;
    $("imagePreview").classList.remove("d-none");
  } else {
    $("imagePreview").classList.add("d-none");
  }

  $("formHeading").textContent = "Edit Product";
  showSection("addProduct");
}

function deleteProduct(id) {
  if(!confirm("Are you sure you want to delete this product?")) return;

  const products = loadProducts().filter(p => String(p.id) !== String(id));

  saveProducts(products);
  renderTable();
  updateStats();
}

function fillRestaurantForm() {
  const data = loadRestaurant();

  $("restaurantName").value = data.name || "";
  $("restaurantTagline").value = data.tagline || "";
  $("restaurantDescription").value = data.description || "";
  $("restaurantAddress").value = data.address || "";
  $("restaurantHours").value = data.hours || "";
  $("restaurantLogo").value = data.logo || "";
}

$("restaurantForm").addEventListener("submit", e => {
  e.preventDefault();

  saveRestaurant({
    name:$("restaurantName").value.trim(),
    tagline:$("restaurantTagline").value.trim(),
    description:$("restaurantDescription").value.trim(),
    address:$("restaurantAddress").value.trim(),
    hours:$("restaurantHours").value.trim(),
    logo:$("restaurantLogo").value.trim()
  });

  alert("Restaurant information saved!");
});

$("viewStoreLink").addEventListener("click", e => {
  e.preventDefault();
  window.location.href = "store.html?store=" + currentStore;
});

updateStoreLink();
updateStats();
renderTable();
fillRestaurantForm();
