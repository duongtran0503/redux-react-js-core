import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const conector = connect((state) => ({
  searchProduct: state.searchProductList,

  productlist: state.productList,
  start: state.limitPage.start,
  end: state.limitPage.end,
  item: state.limitPage.item,
}));
const productlist = ({ searchProduct, productlist, item, start, end }) => {
  console.log(searchProduct);
  if (item.length === 0 && searchProduct.length === 0) {
    let indexstart = start;
    let indexend = end;
    for (indexstart; indexstart <= indexend; indexstart++) {
      item.push(productlist[indexstart]);
    }
  } else if (searchProduct.length !== 0) {
    item = searchProduct;
  }
  return html`
    ${item.map(
      (element, index) =>
        `  <div class="card-cpc">
    <div class="card-image-cpc">
      <img src="./${element.image}" alt="product" />
    </div>
    <div class="card-description-cpc">
      <div class="card-des-content-cpc">
        <div class="card-title">
          <h3>${element.title}</h3>
        </div>
        <div class="card-des-cpc">
          <p>${element.trademark}</p>
        </div>
        <div class="card-price-cpc">
          <h3>${element.price}₫</h3>
        </div>
      </div>
      <div class="card-button-cpc">
        <button   onclick = "dispatch('add',${index},'${element.nameStore}')">Thêm vào giỏ hàng</button>
        <button class="seemore">Show</button>
      </div>
    </div>
  </div>
  `
    )}
  `;
};

export default conector(productlist);
