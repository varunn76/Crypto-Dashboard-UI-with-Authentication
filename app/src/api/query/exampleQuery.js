import Axios from "../axios";

export const fetchExample = async () => {
  try {
    const { data } = Axios.get("/");
    return data;
  } catch (error) {
    throw error(error.response.data.message);
  }
};
