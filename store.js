// --------------------------------------------------
// RESTAURANT DATABASE
// The IDs must match storeId in your main index.html
// --------------------------------------------------

const stores = {

  "golden-kitchen": {
    name:"Golden Kitchen",
    tagline:"Luxury burgers and handcrafted desserts.",
    logo:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=85",
    about:"Golden Kitchen combines premium ingredients, creative recipes and carefully prepared comfort food. From gourmet Wagyu burgers to elegant desserts, every dish is made to deliver a memorable dining experience.",
    address:"Alaunstraße 12, 01099 Dresden, Germany",
    hours:"Monday–Sunday: 11:00–22:00",
    category:"Gourmet Burgers & Desserts",
    rating:"4.9",
    experience:"At Golden Kitchen, we believe that great food starts with exceptional ingredients. Explore our signature burgers and desserts, prepared with attention to every detail.",
    products:[
      {
        id:1,
        name:"Black Truffle Wagyu Burger",
        category:"Gourmet Burgers",
        price:28,
        description:"A5-style Wagyu beef, black truffle aioli, aged cheddar and caramelized shallots.",
        image:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85"
      },
      {
        id:4,
        name:"Golden Pistachio Cheesecake",
        category:"Desserts",
        price:14,
        description:"Silky cheesecake with roasted pistachio, vanilla and a crisp biscuit base.",
        image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85"
      }
    ]
  },

  "ocean-table": {
    name:"Ocean Table",
    tagline:"Fresh seafood and refined culinary creations.",
    logo:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=85",
    about:"Ocean Table celebrates seafood through elegant dishes and carefully balanced flavors. Our menu combines premium fish, fresh ingredients and refined preparation.",
    address:"Wilsdruffer Straße 8, 01067 Dresden, Germany",
    hours:"Monday–Sunday: 12:00–23:00",
    category:"Seafood & Pasta",
    rating:"4.8",
    experience:"Discover seafood-inspired cuisine, from rich pasta dishes to delicate fish specialties, in a relaxed and elegant atmosphere.",
    products:[
      {
        id:2,
        name:"Saffron Lobster Linguine",
        category:"Seafood & Pasta",
        price:36,
        description:"Hand-rolled linguine with lobster and a rich saffron cream sauce.",
        image:"https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85"
      },
      {
        id:5,
        name:"Miso-Glazed Black Cod",
        category:"Seafood",
        price:32,
        description:"Tender black cod with sweet miso glaze, sesame greens and jasmine rice.",
        image:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85"
      }
    ]
  },

  "sakura-house": {
    name:"Sakura House",
    tagline:"An elegant journey through Japanese cuisine.",
    logo:"https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=85",
    about:"Sakura House brings Japanese culinary traditions to the table with carefully selected ingredients, beautiful presentation and a passion for sushi craftsmanship.",
    address:"Schandauer Straße 35, 01309 Dresden, Germany",
    hours:"Monday–Sunday: 12:00–22:00",
    category:"Japanese Cuisine & Sushi",
    rating:"4.9",
    experience:"Enjoy a selection of Japanese specialties, carefully assembled sushi and signature creations.",
    products:[
      {
        id:3,
        name:"Imperial Omakase Sushi Platter",
        category:"Sushi",
        price:65,
        description:"A premium selection of salmon, tuna, seasonal nigiri and signature rolls.",
        image:"https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85"
      }
    ]
  },

  "citrus-bar": {
    name:"Citrus Bar",
    tagline:"Fresh drinks and vibrant citrus creations.",
    logo:"https://images.unsplash.com/photo-1513558161293-c3e0?auto=format&fit=crop&w=300&q=85",
    about:"Citrus Bar focuses on refreshing drinks, bright flavors and carefully balanced combinations. Discover a fresh selection of non-alcoholic refreshments.",
    address:"Bautzner Straße 21, 01099 Dresden, Germany",
    hours:"Monday–Sunday: 10:00–22:00",
    category:"Drinks & Refreshments",
    rating:"4.7",
    experience:"Refresh your day with vibrant citrus flavors and handcrafted drinks made for every occasion.",
    products:[
      {
        id:6,
        name:"Yuzu Citrus Cooler",
        category:"Drinks",
        price:8,
        description:"Bright yuzu, fresh citrus and sparkling water served over ice.",
        image:"https://images.unsplash.com/photo-1513558161293-c3e0?auto=format&fit=crop&w=900&q=85"
      }
    ]
  }

};


// --------------------------------------------------
// LOAD RESTAURANT FROM URL
// Example: store.html?store=golden-kitchen
// --------------------------------------------------

const params = new URLSearchParams(window.location.search);
const storeId = params.get("store");
const store = storeId ? stores[storeId] : null;

const $ = id => document.getElementById(id);

if (!store) {

  document.title = "Restaurant not found | Gourmet Luxe";

  document.querySelector("body").innerHTML = `
    <div class="container text-center py-5">
      <h1 class="gold mb-3">Restaurant Not Found</h1>
      <p class="muted">
        We could not find this restaurant. Please return to our collection.
      </p>
      <a href="mampfshop.html" class="btn btn-gold mt-3">
        Back to Gourmet Luxe
      </a>
    </div>
  `;

} else {

  // Fill restaurant information

  document.title = store.name + " | Gourmet Luxe";

  $("storeLogo").src = store.logo;
  $("storeLogo").alt = store.name + " logo";
  $("storeName").textContent = store.name;
  $("storeTagline").textContent = store.tagline;
  $("storeAbout").textContent = store.about;
  $("storeAddress").textContent = store.address;
  $("storeHours").textContent = store.hours;
  $("storeCategory").textContent = store.category;
  $("storeRatingText").textContent = store.rating + " / 5";

  $("storeRating").innerHTML =
    `<i class="fa-solid fa-star"></i>
     <i class="fa-solid fa-star"></i>
     <i class="fa-solid fa-star"></i>
     <i class="fa-solid fa-star"></i>
     <i class="fa-solid fa-star"></i>
     <span class="text-light ms-2">${store.rating}/5</span>`;

  $("experienceText").textContent = store.experience;

  $("storeMap").href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(store.address);


  // Build category filter

  const categories = [...new Set(store.products.map(p => p.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    $("categoryFilter").appendChild(option);
  });


  // Render food portfolio

  function renderProducts() {

    const search = $("foodSearch").value.toLowerCase().trim();
    const category = $("categoryFilter").value;

    const filtered = store.products.filter(product => {

      const matchesSearch =
        (product.name + " " + product.description + " " + product.category)
        .toLowerCase().includes(search);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    $("productGrid").innerHTML = filtered.map(product => `

      <div class="col-sm-6 col-lg-4">

        <article class="card product-card">

          <img
            class="product-img"
            src="${product.image}"
            alt="${product.name}"
            loading="lazy">

          <div class="card-body p-4">

            <div class="d-flex justify-content-between align-items-center gap-2 mb-2">

              <span class="location-tag">
                ${product.category}
              </span>

              <span class="price">
                $${product.price.toFixed(2)}
              </span>

            </div>

            <h5 class="card-title">
              ${product.name}
            </h5>

            <p class="muted small">
              ${product.description}
            </p>

            <div class="product-actions">

              <a href="index.html#menu"
                class="btn btn-outline-gold btn-sm">
                <i class="fa-solid fa-utensils me-2"></i>
                View Main Shop
              </a>

            </div>

          </div>
        </article>

      </div>

    `).join("");

    $("resultCount").textContent =
      `Showing ${filtered.length} of ${store.products.length} dishes`;

    $("noResults").classList.toggle("d-none", filtered.length !== 0);
  }


  // Search and filter events

  $("foodSearch").addEventListener("input", renderProducts);
  $("categoryFilter").addEventListener("change", renderProducts);

  $("resetFilters").addEventListener("click", () => {
    $("foodSearch").value = "";
    $("categoryFilter").value = "all";
    renderProducts();
  });

  renderProducts();

}
