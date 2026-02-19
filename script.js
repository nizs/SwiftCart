

// -------------------------
// SwiftCart functionality
// -------------------------



/*
-------------------------------------
loading & Displaying trending data
-------------------------------------
*/

// Loading Tending Data
const loadTrending = () => {
  const trending = "https://fakestoreapi.com/products";
  fetch(trending)
    .then(res => res.json())
    .then(data => displayTrending(data))
}
// displaying teending data
const displayTrending = trendings => {
  const trendyData = trendings.slice(0, 3);
  const trendingContainer = document.getElementById('trending-container');
  if (!trendingContainer) return;
  for (let trend of trendyData) {
    // console.log(trend);
    const trendingCard = document.createElement("div");
    trendingCard.innerHTML = `
        <div class="card bg-white shadow-sm">
  <figure>
    <img
        src="${trend.image}"
        class='p-12 bg-gray-300 '
    />
  </figure>
  <div class="card-body">
    <div class="flex justify-between">
      <div class="badge bg-[#E0E7FF]">${trend.category}</div>
      <div class="">
      <span><i class="text-yellow-500 fa-solid fa-star"></i></span>
      <span>${trend.rating.rate}</span>
      <span>(${trend.rating.count})</span>
      </div>
    </div>
    <p>${trend.title.slice(0, 30)}...</p>
    <h2 class="card-title">$${trend.price}</h2>
    <div class="card-actions justify-between">
      <button onClick="loadProductDetails(${trend.id})"  class="btn btn-outline text-[12px]">
      <i class="fa-regular fa-eye"></i>
      Details</button>
      <button class="btn btn-primary text-[12px]">
      <i class="fa-solid fa-cart-shopping"></i>
      Add to Cart</button>
    </div>
  </div>
</div>
        `;
    trendingContainer.append(trendingCard);
  }
}
loadTrending();


/*
-------------------------------------
loading All Products data
-------------------------------------
*/


//Load All products data
const loadAllProducts = () => {
  const allProducts = "https://fakestoreapi.com/products";

  fetch(allProducts)
    .then(res => res.json())
    .then(data => displayAllProducts(data))
}
//Display All products
const displayAllProducts = (products) => {
  //1. get the container and empty
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = "";
  // 2.get level words from having a loop
  for (let product of products) {
    // console.log(product);
    //3.create element
    const productCard = document.createElement('div');
    productCard.innerHTML = `
    <div class="card bg-white shadow-sm">
    <figure>
      <img
          src="${product.image}"
          class='p-12 bg-gray-300 '
      />
    </figure>
    <div class="card-body px-2">
      <div class="flex justify-between items-center">
        <div class="badge bg-[#E0E7FF] text-[12px]">${product.category}</div>
        <div class="text-[12px]">
        <span><i class="text-yellow-500 fa-solid fa-star"></i></span>
        <span>${product.rating.rate}</span>
        <span>(${product.rating.count})</span>
        </div>
      </div>
      <p>${product.title.slice(0, 30)}...</p>
      <h2 class="card-title">$${product.price}</h2>
      <div class="card-actions justify-between text-[12px]">
        <button onClick="loadProductDetails(${product.id})" class="btn btn-outline text-[12px]">
        <i class="fa-regular fa-eye"></i>
        Details</button>
        <button class="btn btn-primary text-[12px]">
        <i class="fa-solid fa-cart-shopping"></i>
        Add to Cart</button>
      </div>
    </div>
  </div>
         `
    //4.Appned into container
    productsContainer.append(productCard);
  }
}



/*
-------------------------------------------------
loading & Displaying Product buttons by category
-------------------------------------------------
*/

// load product button by category
const loadProductsBtn = () => {
  const allproductsBtn = 'https://fakestoreapi.com/products/categories';

  fetch(allproductsBtn)
    .then(res => res.json())
    .then(data => {
      displayProductsBtns(data);
      //All products load after buttons render.
      loadAllProducts();
    });
}
// display Product buttons by category 
const displayProductsBtns = btns => {
  // 1. get the container and empty
  const productBtnContainer = document.getElementById('productBtn-container');
  productBtnContainer.innerHTML = "";

  btns.unshift("All");

  for (let btn of btns) {

    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
      <button class="category-btn btn btn-outline btn-primary hover:text-white rounded-xl">
        ${btn}
      </button>
    `;

    const categoryButton = btnDiv.querySelector('button');

    // Make "All" active by default
    if (btn === "All") {
      categoryButton.classList.add("btn-active");
    }

    categoryButton.addEventListener('click', () => {

      // Remove active from all buttons
      const allButtons = document.querySelectorAll('.category-btn');
      allButtons.forEach(button => {
        button.classList.remove('btn-active');
      });

      // Add active to clicked button
      categoryButton.classList.add('btn-active');

      if (btn === "All") {
        loadAllProducts();
      } else {
        loadProducts(btn);
      }

    });

    productBtnContainer.append(btnDiv);
  }
};
loadProductsBtn();




/*
-------------------------------------------------
loading & Displaying Product Data by category
-------------------------------------------------
*/

// load products data by category
const loadProducts = category => {
  const products = `https://fakestoreapi.com/products/category/${category}`;

  fetch(products)
    .then(res => res.json())
    .then(data => displayProducts(data))
}

// Display products Data by category
const displayProducts = products => {
  //1. get the container and empty
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = "";
  // 2.get products from having a loop
  for (let product of products) {
    // console.log(product);
    //3.create element
    const productCard = document.createElement('div');
    productCard.innerHTML = `
        <div class="card bg-white shadow-sm">
        <figure>
          <img
              src="${product.image}"
              class='p-12 bg-gray-300 '
          />
        </figure>
        <div class="card-body px-2">
          <div class="flex justify-between items-center">
            <div class="badge bg-[#E0E7FF] text-[12px]">${product.category}</div>
            <div class="text-[12px]">
            <span><i class="text-yellow-500 fa-solid fa-star"></i></span>
            <span>${product.rating.rate}</span>
            <span>(${product.rating.count})</span>
            </div>
          </div>
          <p>${product.title.slice(0, 30)}...</p>
          <h2 class="card-title">$${product.price}</h2>
          <div class="card-actions justify-between text-[12px]">
            <button onClick="loadProductDetails(${product.id})" class="btn btn-outline text-[12px]">
            <i class="fa-regular fa-eye"></i>
            Details</button>
            <button class="btn btn-primary text-[12px]">
            <i class="fa-solid fa-cart-shopping"></i>
            Add to Cart</button>
          </div>
        </div>
      </div>
        `
    //4.Appned into container
    productsContainer.append(productCard);
  }

}


/*
-------------------------------------------------
loading & Displaying Product deatail data
-------------------------------------------------
*/

// load product deatail data
const loadProductDetails = id => {
  const productDetail = `https://fakestoreapi.com/products/${id}`;

  fetch(productDetail)
    .then(res => res.json())
    .then(data => displayProductDetails(data))
}
// display product details data
const displayProductDetails = product => {
  const productDetails = document.getElementById("product-details-container");
  productDetails.innerHTML = `<div class="card bg-base-100 card-lg shadow-sm">
    <div class="card-body">
      <h2 class="card-title">${product.title}</h2>
      <p>Description: ${product.description.slice(0, 20)}</p>
      <p>Price: $${product.price}</p>
      <p>Rating: ${product.rating.rate}</p>
      <div class="justify-end card-actions">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>`;

  document.getElementById("product_details_modal").showModal();
}