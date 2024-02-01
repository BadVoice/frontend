import axios from "axios";

export const createCompany = async (name: any) => {
  console.log(name);
  const res = await axios
    .post("http://localhost:5000/companies", { name })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};
