const handleEvent = (event, func, ele) => {
  const element = ele;
  element.addEventListener(event, func);
};
export default handleEvent;
