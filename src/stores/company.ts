import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

import {
  createCompanyService,
  getCompanyService,
  createChannelService,
  getChannelsByCompanyIdService,
  sendMessageService,
  getChannelByIdService,
} from "@/services/api/company/companyAPI";
import type { IChannel } from "@/stores/types/types";

export const useCompanyStore = defineStore("companyStore", () => {
  const companyName = ref("" as string);
  const companyId = ref(0 as number);

  async function setCompanyData(name: string) {
    const response = await createCompanyService(name);
    companyId.value = response.id;

    return response;
  }

  async function getCompanyData(id: number) {
    const response = await getCompanyService(id);
    companyId.value = response.id;
    companyName.value = response.name;
    return response;
  }

  async function getChannelData(companyId: number, channelId: number) {
    const response = await getChannelByIdService(companyId, channelId);
    return response;
  }

  return {
    companyName,
    companyId,
    setCompanyData,
    getCompanyData,
    getChannelData,
  };
});

interface Button {
  content: string;
  type: string;
}

export const useChannelStore = defineStore("channelStore", () => {
  const channels = ref<IChannel[]>([]);

  async function createChannelForm(
    channelId: number,
    text: string,
    buttons: { [keyboardType: string]: Button[] } = {}
  ) {
    console.log(buttons);
    const response = await sendMessageService(channelId, text, buttons);
  }

  async function createChannel(
    channel_name: string,
    app_name: string,
    company_id: number
  ) {
    const response = await createChannelService(
      company_id,
      app_name,
      channel_name
    );
    channels.value.push({
      id: response.id,
      company_id,
      channel_name,
      app_name,
      messages: [],
    });
  }

  async function getChannels(company_id: number) {
    const fetchedChannels = await getChannelsByCompanyIdService(company_id);
    channels.value = fetchedChannels;
    return fetchedChannels;
  }

  return { createChannel, createChannelForm, getChannels };
});
