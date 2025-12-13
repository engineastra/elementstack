export const defaultStateReducer = (state: any, action: any) => {
  const { payload } = action;
  const newState = { ...state, ...payload };
  return { ...newState };
};
