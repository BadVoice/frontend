import axios from "axios";
import type { ICompany } from "@/stores/types/types";

export const createCompanyService = async (name: string) => {
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

export const getCompanyService = async (id: number) => {
  const res = await axios
    .get(`${import.meta.env.VITE_API_URL}/companies/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};

export const createChannelService = async (
  company_id: number,
  app_name: string,
  channel_name: string
) => {
  const res = await axios
    .post(`${import.meta.env.VITE_API_URL}/channels`, {
      company_id,
      app_name,
      channel_name,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};

export const getChannelsByCompanyIdService = async (company_id: number) => {
  const res = await axios
    .get(`${import.meta.env.VITE_API_URL}/channels?companyId=${company_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};

export const sendMessageService = async (channelId: number, text: string) => {
  return axios
    .post(`${import.meta.env.VITE_API_URL}/messages`, {
      channel_id: channelId,
      text,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
