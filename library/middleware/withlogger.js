const withLogger = (reducer) => {
  return (prevState, action, args) => {
    console.group(action);
    console.log("prevState:", prevState);
    console.log("args:", args);
    const nextState = reducer(prevState, action, args);
    console.log("nextState", nextState);
    console.groupEnd();
    return nextState;
  };
};
export default withLogger;
