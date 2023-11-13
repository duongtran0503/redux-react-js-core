import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const connector = connect((state) => ({
  limitPage: state.limitPage,
}));
const paginationprev = ({ limitPage }) => {
  return html`
    <div
      class="prev  ${limitPage.currentpage === 1 && "visible"}"
      onclick="dispatch('prevPage',this)"
    >
      prev
    </div>
  `;
};
const paginationnext = ({ limitPage }) => {
  return html`
    <div
      class="next ${limitPage.currentpage === 5 && "visible"}"
      onclick="dispatch('nextPage',this)"
    >
      next
    </div>
  `;
};
const pagnext = connector(paginationnext);
const pagprev = connector(paginationprev);
export { pagnext, pagprev };
