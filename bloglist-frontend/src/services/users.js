import axios from "axios";

const baseUrl = "/api/users";

const getAll = () => {
  const users = axios.get(baseUrl).then((response) => response.data);
  return users;
};

export default { getAll };
