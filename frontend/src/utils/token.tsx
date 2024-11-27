export const getToken = () => {
  const token = localStorage.getItem("authUser");
  const tokenFormated = JSON.parse(token);
  return tokenFormated.token
}

export const getUser = () => {
  const user = localStorage.getItem("user");
  const userFormated = JSON.parse(user);
  return userFormated;
}
