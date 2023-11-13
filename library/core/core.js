export default function html([frist, ...strings], ...values) {
  return values
    .reduce((acc, cur) => acc.concat(cur, strings.shift()), [frist])
    .filter((x) => (x && x !== true) || x === 0)
    .join("");
}
const createStore = (reducer) => {
  let state = reducer();
  const roots = new Map();
  function render() {
    for (const [root, component] of roots) {
      const output = component();
      root.innerHTML = output;
    }
  }
  return {
    attach(component, root) {
      roots.set(root, component);
      render();
    },
    connect(selector = (state) => state) {
      return (component) =>
        (prop, ...args) => {
          return component(Object.assign({}, prop, selector(state), ...args));
        };
    },
    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    },
  };
};
export { createStore };
