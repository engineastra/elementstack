export const defaultStateReducer = <T, U>(state: T, action: { payload: U }) => {
  const { payload } = action;
  const newState = { ...state, ...payload };
  return { ...newState };
};
