import { fetchData } from "./fetchData";
import { showProduct } from "./updateUI.js";

const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");

fetchData("https://dummyjson.com/product/" + id)
  .then((product) => {
    showProduct(product);
  })
  .catch(() => {
    console.log(error);
  });
