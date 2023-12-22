import axios from "axios";

export const getItemsDB = async (page, limit, item) => {
  try {
    return (
      await axios.get(
        `https://dragonball-api.com/api/${item}?page=${page}&limit=${limit}`
      )
    ).data.items;
  } catch (error) {
    console.log(error || "No se obtuvo los datos de la api");
  }
};

export const getItemByID = (item, id) => {
  return axios
    .get(`https://dragonball-api.com/api/${item}/${id}`)
    .then((r) => r.data)
    .catch((error) => console.log(error.message));
};
