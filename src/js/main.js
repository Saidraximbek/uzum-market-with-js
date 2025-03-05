import "./dark-mode.js";
import { fetchData } from "./fetchData.js";
import { showCards } from "./updateUI.js";

const ctgSelect = document.getElementById("ctg-select");
const cardList = document.getElementById("card-list");
const buyBtn = document.getElementById("buy-btn");

fetchData("https://dummyjson.com/products")
  .then((data) => {
    showCards(data);

    const newCtg = [...new Set(data.products.map((i) => i.category))];

    ctgSelect.innerHTML = `
      <option class="bg-gray-700" value="all">All</option>
      ${newCtg.map((category) => `<option class="bg-gray-700" value="${category}">${category}</option>`).join("")}
    `;

    ctgSelect.addEventListener("change", (i) => {
      const selectedCategory = i.target.value;

      const filteredProducts =
        selectedCategory === "all"
          ? data.products
          : data.products.filter(
              (product) => product.category === selectedCategory,
            );

      cardList.innerHTML = "";

      showCards({ products: filteredProducts });
    });
  })
  .catch((error) => {
    console.log(error);
  });

  buyBtn.addEventListener("click", ()=>{
    
  })