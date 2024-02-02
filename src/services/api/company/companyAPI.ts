import axios from "axios";
import type { ICompany } from "@/stores/types/types";

export const createCompany = async (name: string) => {
  const res = await axios
    .post<ICompany>(`${import.meta.env.VITE_API_URL}/companies`, { name })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};
