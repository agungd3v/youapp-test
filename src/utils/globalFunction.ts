export const validateTypeEmail = (param: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(param);
}