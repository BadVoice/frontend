<template>
  <div
    class="flex flex-col gap-[50px] flex-wrap content-center justify-center items-start"
  >
    <div
      class="bg-gradient-to-t from-blue-200 to-green-200 rounded-lg p-8 w-[900px]"
    >
      <h1 class="text-3xl font-bold mb-4 text-center">
        Вы можете настроить и создать каналы в компании:
      </h1>
      <div v-if="companyName" class="mb-8 text-center">
        <h2 class="text-4xl">{{ companyName }}</h2>
      </div>
      <div v-else class="text-center">
        <p>Загрузка данных...</p>
      </div>
    </div>
    <p class="text-1xl font-bold text-red-500" v-if="error">{{ error }}</p>
    <div class="flex gap-5">
      <input
        v-model="channelName"
        type="text"
        placeholder="Название канала"
        class="border rounded p-2 mb-2"
      />
      <select v-model="selectedChannelType" class="border rounded p-2 mb-2">
        <option
          v-for="(type, index) in channelTypes"
          :key="index"
          :value="type"
        >
          {{ type }}
        </option>
      </select>
      <button
        @click="onCreateChannel"
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Создать канал
      </button>
    </div>
    <p class="text-gray-600 font-bold">Список каналов:</p>
    <div class="flex flex-wrap justify-center">
      <div v-for="channel in channels" :key="channel.id" class="m-4">
        <div class="bg-white rounded-lg shadow-md min-w-400 flex flex-col">
          <div
            class="bg-gradient-to-r from-purple-400 to-pink-500 rounded-t-lg p-4"
          >
            <p class="text-lg font-semibold text-white">
              Название канала: {{ channel.channel_name }}
            </p>
          </div>
          <div class="p-4">
            <p class="text-gray-600 font-bold">
              Мессенджер: {{ channel.app_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <button
      class="bg-red-500 text-white font-bold py-2 px-4 rounded"
      @click="openModal"
    >
      Открыть форму
    </button>
  </div>
  <div>
    <ChannelModalForm
      :channels="channels"
      :channelId="selectedChannelId"
      v-if="isModalOpen"
      @close-modal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore, useChannelStore } from "@/stores/company";
import type { IChannel } from "@/stores/types/types";

import ChannelModalForm from "@/components/ChannelModalForm.vue";

const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const route = useRoute();

const companyStore = useCompanyStore();
const channelsStore = useChannelStore();

const companyName: Ref<string> = ref("");
const companyId: Ref<number> = ref(0);

const channelName: Ref<string> = ref("");
const selectedChannelType = ref("");
const channelTypes = computed(() => ["Telegram", "WhatsApp", "Vkontakte"]);

const channels = ref<IChannel[]>([]);
const error = ref("");

const selectedChannelId = ref(0 as number);

const onCreateChannel = async () => {
  await channelsStore
    .createChannel(
      channelName.value,
      selectedChannelType.value,
      companyId.value
    )
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        error.value =
          "Ошибка: Вы можете создать только один канал определенного типа.";
      } else {
        error.value =
          "Произошла ошибка при создании канала. Пожалуйста, обратитесь в службу поддержки.";
        console.error("Ошибка при создании канала:", error);
      }
    });
};

onMounted(async () => {
  const id = parseInt(route.params.id as string, 10);

  if (!isNaN(id)) {
    companyId.value = id;
    await companyStore.getCompanyData(companyId.value);
    companyId.value = companyStore.companyId;
    companyName.value = companyStore.companyName;
  }
});

onMounted(async () => {
  try {
    const data = await channelsStore.getChannels(companyId.value);
    channels.value = data;
    console.log(channels.value);
  } catch (error) {
    console.error("Ошибка при получении каналов", error);
  }
});
</script>
