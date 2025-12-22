export const defaultStateReducer = <T, U>(state: T, action: { payload: U }) => {
  const { payload } = action;
  const newState = { ...state, ...payload };
  return { ...newState };
};

export const encodeBase64 = (value: string) =>
  btoa(
    new TextEncoder()
      .encode(value)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

export const decodeBase64 = (value: string) =>
  new TextDecoder().decode(
    Uint8Array.from(atob(value), (c) => c.charCodeAt(0))
  );

export const iconColor = (color: string) => ({
  '& path': { fill: color },
});
