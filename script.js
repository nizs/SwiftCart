// loading trending data
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
  if (products.length == 0) {
    productsContainer.innerHTML = `
         <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
         <p class="text-xl font-medium text-black">No Category has been selected.Please seclect a category above</p>
         <h2 class="font-bold text-4xl">নেক্সট <span class="text-primary">Lesson</span> এ যান</h2>
     </div>
         `
    return;
  }
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
         <div class="card-body">
           <div class="flex justify-between">
             <div class="badge bg-[#E0E7FF]">${product.category}</div>
             <div class="">
             <span><i class="text-yellow-500 fa-solid fa-star"></i></span>
             <span>${product.rating.rate}</span>
             <span>(${product.rating.count})</span>
             </div>
           </div>
           <p>${product.title.slice(0, 30)}...</p>
           <h2 class="card-title">$${product.price}</h2>
           <div class="card-actions justify-between">
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

// Load products btn by category
const loadProductsBtn = () => {
  const allproductsBtn = 'https://fakestoreapi.com/products/categories';

  fetch(allproductsBtn)
    .then(res => res.json())
    .then(data => displayProductsBtns(data))
}
// display Product buttons by category
const displayProductsBtns = btns => {
  //1. get the container and empty
  const productBtnContainer = document.getElementById('productBtn-container');
  productBtnContainer.innerHTML = "";
  btns.unshift("All");
  // 2.get lesson from having a loop
  for (let btn of btns) {
    // console.log(btn);
    //3.create element
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary hover:text-white rounded-xl">${btn}</button>
        `;
    const categoryButton = btnDiv.querySelector('button');
    categoryButton.addEventListener('click', () => {
      if (btn === "All") {
        loadAllProducts();   // 🔥 call special function
      } else {
        loadProducts(btn);   // existing category loader
      }

    });

    //4.Appned into container
    productBtnContainer.append(btnDiv);
  }
}

loadProductsBtn();

// load products data by category
const loadProducts = category => {
  const products = `https://fakestoreapi.com/products/category/${category}`;

  fetch(products)
    .then(res => res.json())
    .then(data => displayProducts(data))
}

// Display products
const displayProducts = products => {
  //1. get the container and empty
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = "";
  if (products.length == 0) {
    productsContainer.innerHTML = `
        <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <p class="text-xl font-medium text-black">No Category has been selected.Please seclect a category above</p>
        <h2 class="font-bold text-4xl">নেক্সট <span class="text-primary">Lesson</span> এ যান</h2>
    </div>
        `
    return;
  }
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
        <div class="card-body">
          <div class="flex justify-between">
            <div class="badge bg-[#E0E7FF]">${product.category}</div>
            <div class="">
            <span><i class="text-yellow-500 fa-solid fa-star"></i></span>
            <span>${product.rating.rate}</span>
            <span>(${product.rating.count})</span>
            </div>
          </div>
          <p>${product.title.slice(0, 30)}...</p>
          <h2 class="card-title">$${product.price}</h2>
          <div class="card-actions justify-between">
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

const loadProductDetails = id => {
  const productDetail = `https://fakestoreapi.com/products/${id}`;

  fetch(productDetail)
    .then(res => res.json())
    .then(data => displayProductDetails(data))
}

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