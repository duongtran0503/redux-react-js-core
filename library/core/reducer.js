import DATA from "../../db/Data.js";
let list = [];
for (const property in DATA) {
  list = list.concat(DATA[property]);
}
const init = {
  data: DATA,
  productList: [...list],
  searchProductList: [],

  limitPage: { start: 0, end: 5, itemperpage: 6, item: [], currentpage: 1 },
};
const reducer = (state = init, action, args) => {
  switch (action) {
    case "searchItem": {
      console.log(args[0]);
      const keyword = args[0].trim();
      console.log(keyword);
      const result = [];
      const prevArray = state.productList;
      prevArray.forEach((product) => {
        if (product.title.includes(keyword)) {
          result.push(product);
        }
      });
      console.log(result);

      const newLimitPage = {
        ...state.limitPage,

        start: 0,
        end: result.length - 1,
        currentpage: 1,
      };
      return {
        ...state,
        searchProductList: result,
        limitPage: newLimitPage,
      };
    }
    case "changePage": {
      console.log(args[1]);
      const element = args[1];
      const pagination = [...element.parentElement.children];
      pagination.forEach((element) => {
        element.classList.remove("active");
      });
      element.classList.toggle("active");
      const itemperpage = state.limitPage.itemperpage;
      let newLimitPage = {
        ...state.limitPage,

        start: (args[0] - 1) * itemperpage,
        end: args[0] * itemperpage,
        currentpage: args[0],
      };
      let list = [];
      let start = newLimitPage.start;
      let end = newLimitPage.end;
      for (start; start <= end; start++) {
        list.push(state.productList[start]);
      }
      newLimitPage = {
        ...newLimitPage,
        item: list,
      };
      return {
        ...state,
        searchProductList: [],

        limitPage: newLimitPage,
      };
    }
    case "nextPage": {
      const element = args[0];
      console.log(element);
      const pagination = [...element.parentElement.parentElement.children];
      console.log(pagination);
      let index = 1;
      pagination.forEach((element) => {
        if (element.classList.contains("active")) {
          index = +element.id;
          console.log(element);
          element.classList.remove("active");
        }
      });
      pagination[++index].classList.toggle("active");
      const itemperpage = state.limitPage.itemperpage;
      let newLimitPage = {
        ...state.limitPage,

        start: (index - 1) * itemperpage,
        end: index * itemperpage,
        currentpage: index,
      };

      let list = [];
      let start = newLimitPage.start;
      let end = newLimitPage.end;
      for (start; start <= end; start++) {
        list.push(state.productList[start]);
      }
      newLimitPage = {
        ...newLimitPage,
        item: list,
      };
      return {
        ...state,
        searchProductList: [],

        limitPage: newLimitPage,
      };
    }
    case "prevPage": {
      const element = args[0];
      const pagination = [...element.parentElement.parentElement.children];
      let index = 1;
      pagination.forEach((element) => {
        if (element.classList.contains("active")) {
          index = +element.id;
          element.classList.remove("active");
        }
      });
      pagination[--index].classList.toggle("active");

      const itemperpage = state.limitPage.itemperpage;
      let newLimitPage = {
        ...state.limitPage,

        start: (index - 1) * itemperpage,
        end: index * itemperpage,
        currentpage: index,
      };
      let list = [];
      let start = newLimitPage.start;
      let end = newLimitPage.end;
      for (start; start <= end; start++) {
        list.push(state.productList[start]);
      }
      newLimitPage = {
        ...newLimitPage,
        item: list,
      };

      return {
        ...state,
        searchProductList: [],

        limitPage: newLimitPage,
      };
    }
    default:
      return state;
  }
};
export default reducer;
