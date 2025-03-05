
import { fetchData } from "./fetchData.js";
import { showProduct } from "./updateUI.js";
import "./dark-mode.js";

const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");

const heroImg = document.getElementById("hero-img");
const rating = document.getElementById("rating");
const ctg = document.getElementById("ctg-btn");
const brand = document.getElementById("brand");
const title = document.getElementById("title");
const width = document.getElementById("prod-width");
const height = document.getElementById("prod-height");
const depth = document.getElementById("prod-depth");
const use0 = document.getElementById("prod-use-0");
const use1 = document.getElementById("prod-use-1");
const use2 = document.getElementById("prod-use-2");
const price = document.getElementById("prod-price");
const priceDic = document.getElementById("prod-dic-price");
const desc = document.querySelector(".descc");
const indicator = document.getElementsByClassName("indicatorEl")
const plus = document.getElementById("plus-btn");
const minus = document.getElementById("minus-btn");
const count = document.getElementById("count");

let countNum = 1; 
count.textContent = countNum;

let currentProduct = null; 

const updatePrice = () => {
  if (currentProduct) {
    price.textContent = (currentProduct.price * countNum).toFixed(2);
    priceDic.textContent = ((currentProduct.price - (currentProduct.price / 100) * currentProduct.discountPercentage) * countNum).toFixed(2);
  }
};

plus.addEventListener("click", () => {
  countNum++;
  count.textContent = countNum;
  updatePrice();
});

minus.addEventListener("click", () => {
  if (countNum > 1) { 
    countNum--;
    count.textContent = countNum;
    updatePrice();
  }
});




fetchData("https://dummyjson.com/product/" + id)
  .then((product) => {
    currentProduct = product; 
    
    showProduct(product);
    heroImg.src = product.thumbnail;
    rating.textContent = product.rating;
    ctg.textContent = product.category;
    brand.textContent = product.brand;
    title.textContent = product.title;
    desc.textContent = product.description;
    width.textContent = product.dimensions.width
    height.textContent = product.dimensions.height
    depth.textContent = product.dimensions.depth
    use0.textContent = product.warrantyInformation
    use1.textContent = product.shippingInformation
    use2.textContent = product.availabilityStatus;

    updatePrice(); 
  })
  .catch((error) => {
    console.log(error);
  });
