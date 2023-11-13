import { attach } from "./core/store.js";
import productlist from "./components/shop/productlist.js";
import { pagnext, pagprev } from "./components/shop/pagnation.js";
import handleEvent from "./middleware/HandleEvent.js";
const eleproductlist = document.getElementById("ele-productList");
const elepaginationprev = document.getElementById("ele-pagination-prev");
const elepaginationnext = document.getElementById("ele-pagination-next");
const input = document.getElementById("input");
if (input) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch("searchItem", input.value);
      input.value = "";
      input.blur();
    }
  };
  handleEvent("keydown", handleKeyDown, input);
}

if (productlist) {
  attach(productlist, eleproductlist);
}
if (elepaginationprev) {
  attach(pagprev, elepaginationprev);
}
if (elepaginationnext) {
  attach(pagnext, elepaginationnext);
}
