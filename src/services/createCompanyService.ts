import axios from "axios";

export const createCompanyService = async () => {
  await axios
    .post("http://localhost:5000/companies", { name })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
