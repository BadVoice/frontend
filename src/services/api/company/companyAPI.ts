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

interface Button {
  content: string;
  type: string;
}

export const sendMessageService = async (
  channelId: number,
  text: string,
  keyboardType?: string,
  buttons: { [keyboardType: string]: Button[] } = {}
) => {
  const messageResponse = await axios.post(
    `${import.meta.env.VITE_API_URL}/messages`,
    {
      channel_id: channelId,
      text,
    }
  );

  const messageId = messageResponse.data.id;
  const keyboardIds = [];

  for (const keyboardType in buttons) {
    const keyboardResponse = await axios.post(
      ` ${import.meta.env.VITE_API_URL}/keyboards`,
      {
        message_id: messageId,
        type: keyboardType,
      }
    );

    const keyboardId = keyboardResponse.data.id;
    keyboardIds.push(keyboardId);

    if (buttons[keyboardType]) {
      for (const button of buttons[keyboardType]) {
        const buttonResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/buttons`,
          {
            keyboard_id: keyboardId,
            content: button.content,
            type: button.type,
          }
        );
      }
    }
  }
};
